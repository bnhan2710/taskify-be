import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../../common/enums/role";
import { User } from "./User";

@Entity('users_roles')
export class Role {
  @PrimaryGeneratedColumn()
  roleId!: number;

  @ManyToOne(() => User, (user) => user.roles)
  user!: User;

  @Column({ type: "enum", enum: RoleEnum, default: RoleEnum.USER })
  roleNames!: RoleEnum;
}