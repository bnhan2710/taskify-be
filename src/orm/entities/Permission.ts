import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Role } from './Role';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: "varchar", length: 100 , unique: true })
  name!: string; 

  @ManyToMany(() => Role, role => role.permissions)
  roles?: Role[];

}