import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Board } from './Board';
import { User } from './User';
import { Role } from './Role';

@Entity('board_user_roles')
export class BoardUserRole {
  @PrimaryColumn({ name: 'user_id' })
  userId!: string;

  @PrimaryColumn({ name: 'board_id' })
  boardId!: string;

  @PrimaryColumn({ name: 'role_id' })
  roleId!: string;

  @ManyToOne(() => User, (user) => user.boardUserRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Board, (board) => board.boardUserRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board!: Board;

  @ManyToOne(() => Role, (role) => role.boardUserRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}
