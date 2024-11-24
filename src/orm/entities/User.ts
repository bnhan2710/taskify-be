import { Column,  Entity,  ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/base/base-entity";
import { Workspace } from "./Workspace";
import { Gender } from "../../common/enums/gender";
import { ActivityLog } from "./Activity_Log";
import { Token } from "./Token";
import { Comment } from "./Comment";
import { BoardUserRole } from "./BoardUserRole";
@Entity('users')
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 50, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  fullName?: string;

  @Column({ type: "int", nullable: true })
  age?: number;

  @Column({type:"enum", enum: Gender, default: 'unknown'})
  gender?: Gender

  @Column({ type: "varchar", length: 255, nullable: true })
  avatar?: string;

  @OneToMany(() => Workspace, workspace => workspace.owner)
  workspaces!: Workspace[];

  @ManyToMany(() => Workspace, workspace => workspace.users)
  joinedWorkspaces!: Workspace[];

  @OneToMany(() => BoardUserRole, boardUserRole => boardUserRole.user, { cascade: true, onDelete: 'CASCADE' })
  boardUserRoles!: BoardUserRole[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs!: ActivityLog[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[];
}

