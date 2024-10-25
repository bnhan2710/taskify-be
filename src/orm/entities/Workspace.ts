import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Board } from "./Board";
@Entity('workspaces')
export class Workspace {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @OneToOne(() => User, user => user.workspaces)
    owner!: User;

    @OneToMany(() => Board, board => board.workspace)
    boards!: Board[];

    @ManyToMany(() => User, user =>user.workspaces)
    @JoinTable(
        { name: 'workspace_members',
        joinColumn: {name: 'workspace_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
        }
    )
    members!: User[];

    @Column({ type: "varchar", length: 255, nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
}
