import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from './Role';
import { Workspace } from "./Workspace";
import { Gender } from "../../common/enums/gender";
import { Board } from "./Board";
import { ActivityLog } from "./Activity_Log";
import { Token } from "./Token";
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({type:"enum", enum: Gender, default: 'unknown'})
  gender?: Gender

  @Column({ type: "varchar", length: 255, nullable: true })
  avatar?: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn:{name: 'user_id' , referencedColumnName: 'id' },
    inverseJoinColumn:{name:'role_id', referencedColumnName: 'id' },
  })
  roles?: Role[];

  @ManyToMany(() => Workspace, workspace => workspace.owner)
  workspaces!: Workspace[];

  @ManyToMany(() => Board, board => board.user)
  boards!: Board[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs!: ActivityLog[];

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[];
}

