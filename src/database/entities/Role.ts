import { Column, Entity,  ManyToMany, JoinTable, OneToMany } from "typeorm";
import { BaseEntity } from '../../shared/base/base-entity';
import { Permission } from "./Permission";
import { User } from "./User";
import { BoardUserRole } from "./BoardUserRole";
@Entity('roles')
export class Role extends BaseEntity {
  @Column({type: "varchar" , length : 100 , unique: true})
  name!: string   

  @ManyToMany(() => Permission , permissions => permissions.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {name: 'role_id', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}
  })  
  permissions?: Permission[];

  @ManyToMany(() => User, user => user.roles)
  users!: User[];

  @OneToMany(() => BoardUserRole, boardUserRole => boardUserRole.role, { cascade: true, onDelete: 'CASCADE' })
  boardUserRoles!: BoardUserRole[];
}



