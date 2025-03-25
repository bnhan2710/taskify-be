import { Column, Entity, JoinTable, ManyToMany,  OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { BaseEntity } from '../../shared/base/base-entity';
import { User } from "./User";
import { Board } from "./Board";
@Entity('workspaces')
export class Workspace extends BaseEntity{
    @Column({ type: "varchar", length: 255 })
    name!: string;

    @ManyToOne(() => User, user => user.workspaces)
    @JoinColumn({ name: 'user_id'})
    owner!: User;

    @OneToMany(() => Board, board => board.workspace)
    boards!: Board[];
    
    @ManyToMany(() => User, user =>user.workspaces ,{ cascade: true, onDelete: 'CASCADE' })
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
}
