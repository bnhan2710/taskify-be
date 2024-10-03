import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from './Role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  fullName?: string;

  @Column({ type: "int", nullable: true })
  age?: number;

  @OneToMany(() => Role, (role) => role.user, { cascade: true })
  roles!: Role[];
}
