import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ type: "varchar", length: 50, unique: true })
   title!: string;

   @Column({ type: "varchar", length: 255 })
   description!: string;

   @Column({ type: "boolean", default: false })
   isDone!: boolean;
}
