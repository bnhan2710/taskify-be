import { Role } from '../entities/Role';
import { Permission } from '../entities/Permission';
import { RoleEnum } from '../../shared/common/enums/role';
import { PermissionEnum } from '../../shared/common/enums/permission';
import connection from '../../core/configs/database.connect';

export async function seedRBAC(): Promise<void> {
  if (!connection.isInitialized) {
    await connection.initialize();
  }
  const roleRepo = connection.getRepository(Role);
  const permissionRepo = connection.getRepository(Permission);

  const checkSeederExist = await roleRepo.findOne({ where: { name: RoleEnum.OWNER } });
  if (checkSeederExist) {
    return;
  }

  const roles = [
    { name: RoleEnum.ADMIN },
    { name: RoleEnum.OWNER },
    { name: RoleEnum.GUEST },
    { name: RoleEnum.MEMBER },
  ];
  const permissions = [
    { name: PermissionEnum.CAN_VIEW_BOARD },
    { name: PermissionEnum.CAN_UPDATE_BOARD },
    { name: PermissionEnum.CAN_DELETE_BOARD },
    { name: PermissionEnum.CAN_INVITE_MEMBER },
    { name: PermissionEnum.CAN_REMOVE_MEMBER },
    { name: PermissionEnum.CAN_CHANGE_ROLE },
    { name: PermissionEnum.CAN_CREATE_LIST },
    { name: PermissionEnum.CAN_UPDATE_LIST },
    { name: PermissionEnum.CAN_DELETE_LIST },
    { name: PermissionEnum.CAN_CREATE_CARD },
    { name: PermissionEnum.CAN_VIEW_CARD },
    { name: PermissionEnum.CAN_UPDATE_CARD },
    { name: PermissionEnum.CAN_DELETE_CARD },
  ];
  await roleRepo.save(roles);
  await permissionRepo.save(permissions);
  const adminRole = await roleRepo.findOne({ where: { name: RoleEnum.ADMIN } });
  const ownerRole = await roleRepo.findOne({ where: { name: RoleEnum.OWNER } });
  const memberRole = await roleRepo.findOne({ where: { name: RoleEnum.MEMBER } });
  const guestRole = await roleRepo.findOne({ where: { name: RoleEnum.GUEST } });

  const canViewBoard = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_VIEW_BOARD },
  });
  const canUpdateBoard = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_UPDATE_BOARD },
  });
  const canDeleteBoard = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_DELETE_BOARD },
  });
  const canInviteMember = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_INVITE_MEMBER },
  });
  const canRemoveMember = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_REMOVE_MEMBER },
  });
  const canChangeRole = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_CHANGE_ROLE },
  });
  const canCreateList = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_CREATE_LIST },
  });
  const canUpdateList = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_UPDATE_LIST },
  });
  const canDeleteList = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_DELETE_LIST },
  });
  const canCreateCard = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_CREATE_CARD },
  });
  const canViewCard = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_VIEW_CARD },
  });
  const canUpdateCard = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_UPDATE_CARD },
  });
  const canDeleteCard = await permissionRepo.findOne({
    where: { name: PermissionEnum.CAN_DELETE_CARD },
  });

  if (
    !adminRole ||
    !ownerRole ||
    !memberRole ||
    !guestRole ||
    !canViewBoard ||
    !canUpdateBoard ||
    !canDeleteBoard ||
    !canInviteMember ||
    !canRemoveMember ||
    !canChangeRole ||
    !canCreateList ||
    !canUpdateList ||
    !canDeleteList ||
    !canCreateCard ||
    !canViewCard ||
    !canUpdateCard ||
    !canDeleteCard
  ) {
    throw new Error('Role or Permission not found');
  }

  // Admin has all permissions
  adminRole.permissions = [
    canViewBoard,
    canUpdateBoard,
    canDeleteBoard,
    canInviteMember,
    canRemoveMember,
    canChangeRole,
    canCreateList,
    canUpdateList,
    canDeleteList,
    canCreateCard,
    canViewCard,
    canUpdateCard,
    canDeleteCard,
  ];

  // Owner has all board-related permissions
  ownerRole.permissions = [
    canViewBoard,
    canUpdateBoard,
    canDeleteBoard,
    canInviteMember,
    canRemoveMember,
    canChangeRole,
    canCreateList,
    canUpdateList,
    canDeleteList,
    canCreateCard,
    canViewCard,
    canUpdateCard,
    canDeleteCard,
  ];

  // Member has limited edit permissions
  memberRole.permissions = [
    canViewBoard,
    canCreateList,
    canUpdateList,
    canCreateCard,
    canViewCard,
    canUpdateCard,
  ];

  // Guest can only view
  guestRole.permissions = [canViewBoard, canViewCard];

  await roleRepo.save([adminRole, ownerRole, memberRole, guestRole]);
}

seedRBAC()
  .then(() => {
    console.log('Authorization seeder executed');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
