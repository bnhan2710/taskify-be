import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";
@Entity('workspaces')
export class Workspace {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @OneToOne(() => User)
    @JoinTable({ name: 'owner_id' })
     user!: User;
 
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
