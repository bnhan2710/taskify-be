import { Column,  Entity,  JoinTable,  ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from '../base-entity';
import { Workspace } from "./Workspace";
import { Gender } from "../../common/enums/gender";
import { ActivityLog } from "./Activity_Log";
import { Token } from "./Token";
import { Comment } from "./Comment";
import { BoardUserRole } from "./BoardUserRole";
import { Role } from "./Role"
import { Card } from "./Card";
@Entity('users')
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 50, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  displayName?: string;

  @Column({ type: "int", nullable: true })
  age?: number;

  @Column({type:"enum", enum: Gender, default: 'unknown'})
  gender?: Gender

  @Column({ type: "varchar", length: 255, nullable: true })
  avatar?: string;

  @ManyToMany(() => Workspace, workspace => workspace.users)
  joinedWorkspaces!: Workspace[];

  @ManyToMany(() => Card, card => card.member)
  cards?: Card[]

  @OneToMany(() => Workspace, workspace => workspace.owner)
  workspaces!: Workspace[];

  @OneToMany(() => BoardUserRole, boardUserRole => boardUserRole.user, { cascade: true, onDelete: 'CASCADE' })
  boardUserRoles!: BoardUserRole[];

  @ManyToMany(() => Role, roles => roles.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
  })
  roles!: Role[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs!: ActivityLog[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[];
}

