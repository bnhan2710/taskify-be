import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Notification {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

}
