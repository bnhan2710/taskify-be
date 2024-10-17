import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";
import { permission } from "process";

@Entity('roles')
export class Role{
  @PrimaryGeneratedColumn()
  id!: number;

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
  users?: User[];
  
}



