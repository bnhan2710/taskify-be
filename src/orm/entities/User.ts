import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from './Role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  fullName?: string;

  @Column({ type: "int", nullable: true })
  age?: number;

  @Column({ type: "date", nullable: true })
  createdAt?: Date;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn:{name: 'user_id' , referencedColumnName: 'id' },
    inverseJoinColumn:{name:'role_id', referencedColumnName: 'id' },
  })
  roles?: Role[];
}
