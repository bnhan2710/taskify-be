import { 
    Column, 
    Entity, 
    OneToMany, 
    ManyToOne, 
    JoinColumn 
  } from "typeorm";
  import { BaseEntity } from '../../shared/base/base-entity';
  import { List } from './List';
  import { ActivityLog } from './Activity_Log';
  import { Workspace } from "./Workspace";
  import { BoardUserRole } from './BoardUserRole';

  @Entity('boards')
  export class Board extends BaseEntity{

    @Column({ type: "varchar", length: 255})
    title!: string;
  
    @Column({ type: "text", nullable: true })
    description!: string;

    @Column({ type: "varchar", length: 255})
    type!: string;

    @ManyToOne(() => Workspace, workspace => workspace.boards,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'workspace_id' }) 
    workspace!: Workspace;
    
    @OneToMany(() => BoardUserRole, boardUserRole => boardUserRole.board, { cascade: true, onDelete: 'CASCADE' })
    boardUserRoles!: BoardUserRole[];

    @Column("simple-array", { nullable: true })
    listOrderIds!: string[];  
  
    @OneToMany(() => List, list => list.board, { cascade: true, onDelete: 'CASCADE' })
    lists!: List[];
  
    @OneToMany(() => ActivityLog, activityLog => activityLog.board , { cascade: true, onDelete: 'CASCADE' })
    activityLogs!: ActivityLog[];
  }
  