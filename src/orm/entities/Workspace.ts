import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Board } from "./Board";
@Entity('workspaces')
export class Workspace {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @ManyToOne(() => User, user => user.workspaces)
    @JoinColumn({ name: 'user_id'})
    owner!: User;

    @OneToMany(() => Board, board => board.workspace)
    boards!: Board[];

    @ManyToMany(() => User, user =>user.workspaces ,{onDelete:'CASCADE'})
    @JoinTable(
        { 
        name: 'workspace_users',
            joinColumn: { name: 'workspace_id', referencedColumnName: 'id'},
            inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
        }
    )
    users!: User[];

    @Column({ type: "varchar", length: 255, nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date
}
