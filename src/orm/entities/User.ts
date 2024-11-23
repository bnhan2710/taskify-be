import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from './Role';
import { Workspace } from "./Workspace";
import { Gender } from "../../common/enums/gender";
import { Board } from "./Board";
import { ActivityLog } from "./Activity_Log";
import { Token } from "./Token";
import { Comment } from "./Comment";
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn:{name: 'user_id' , referencedColumnName: 'id' },
    inverseJoinColumn:{name:'role_id', referencedColumnName: 'id' },
  })
  roles?: Role[];

  @OneToMany(() => Workspace, workspace => workspace.owner)
  workspaces!: Workspace[];

  @ManyToMany(() => Workspace, workspace => workspace.users)
  joinedWorkspaces!: Workspace[];

  @ManyToMany(() => Board, board => board.user)
  boards!: Board[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs!: ActivityLog[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[];
}

