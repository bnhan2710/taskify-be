import { 
    Column, 
    Entity, 
    JoinTable, 
    OneToOne, 
    ManyToMany, 
    PrimaryGeneratedColumn, 
    OneToMany, 
    CreateDateColumn, 
    ManyToOne, 
    UpdateDateColumn, 
    JoinColumn 
  } from "typeorm";
  import { User } from "./User";
  import { List } from './List';
  import { ActivityLog } from './Activity_Log';
  import { Workspace } from "./Workspace";
  
  @Entity('boards')
  export class Board {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column({ type: "varchar", length: 255})
    title!: string;
  
    @Column({ type: "text", nullable: true })
    description!: string;

    @ManyToOne(() => User, user => user.boards,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'owner_id' }) 
    user!: User;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
  
    @ManyToOne(() => Workspace, workspace => workspace.boards,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'workspace_id' }) 
    workspace!: Workspace;
    
    @Column("simple-array", { nullable: true })
    listOrderIds!: string[];  
  
    @ManyToMany(() => User, user => user.boards)
    @JoinTable({
      name: 'board_users',  
      joinColumn: { name: 'board_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
    })
    users!: User[];
  
    @OneToMany(() => List, list => list.board, { cascade: true, onDelete: 'CASCADE' })
    lists!: List[];
  
    @OneToMany(() => ActivityLog, activityLog => activityLog.board , { cascade: true, onDelete: 'CASCADE' })
    activityLogs!: ActivityLog[];
  }
  