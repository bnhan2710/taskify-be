import { Request, Response, NextFunction } from 'express';
import { User } from '../../database/entities/User';
import { Permission } from '../../database/entities/Permission';
import { BoardUserRole } from '../../database/entities/BoardUserRole';
import { AuthFailError, ForbiddenError } from '../handler/error.response';
import cacheService from '../../shared/services/cache.service';
import connection from '../configs/database.connect';
import { Board } from '../../database/entities/Board';

function extractBoardId(req: Request): string | undefined {
  // console.log('REQ BODY ', req.body);
  // console.log('REQ PARAMS ', req.params);
  // console.log('REQ QUERY ', req.query);
  return req.body.boardId || req.params.id;
}

async function isBoardPublic(boardId: string): Promise<boolean> {
  const boardRepo = connection.getRepository(Board);
  const board = await boardRepo.findOne({
    where: { id: boardId },
    cache: true,
  });
  return board?.type === 'public' ? true : false;
}
async function getUserBoardPermissions(userId: string, boardId: string): Promise<string[]> {
  const cacheKey = `board:${boardId}:user:${userId}:permissions`;

  const cachedPermissions = await cacheService.get<string[]>(cacheKey);
  if (cachedPermissions) {
    return cachedPermissions;
  }

  const userRoleRepo = connection.getRepository(BoardUserRole);
  const permissionRepo = connection.getRepository(Permission);

  const userInBoard = await userRoleRepo.findOne({
    where: { userId, boardId },
    cache: true,
  });

  if (!userInBoard) {
    return [];
  }

  const userPermissions = await permissionRepo.find({
    where: { roles: { id: userInBoard.roleId } },
    cache: true,
  });

  const permissionList = userPermissions.map((permission) => permission.name);

  await cacheService.set(cacheKey, permissionList, 60 * 15);

  return permissionList;
}

function hasRequiredPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
  return requiredPermissions.some((permission) => userPermissions.includes(permission));
}

export function requireBoardPermissions(requiredPermissions: string[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.userJwt?.id;
      if (!userId) {
        return next(new ForbiddenError('Authentication required'));
      }

      const boardId = extractBoardId(req);
      if (!boardId) {
        return next(new ForbiddenError('Board ID is required'));
      }

      if (await isBoardPublic(boardId)) {
        return next();
      }
      const userRepo = connection.getRepository(User);
      const userExists = await userRepo.findOne({
        where: { id: userId },
      });
      if (!userExists) {
        return next(new AuthFailError('User not found'));
      }
      const userPermissions = await getUserBoardPermissions(userId, boardId);
      if (userPermissions.length === 0) {
        return next(new ForbiddenError('You are not a member of this board'));
      }

      if (hasRequiredPermission(userPermissions, requiredPermissions)) {
        return next();
      }

      return next(new ForbiddenError('You do not have permsssion'));
    } catch (error) {
      next(error);
    }
  };
}
