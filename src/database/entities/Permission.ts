import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Role } from './Role';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  name!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles?: Role[];
}
