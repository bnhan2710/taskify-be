import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Card } from "./Card";
import { User } from "./User";
import { Board } from "./Board";
@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.activityLogs)
  user!: User;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @ManyToOne(() => Board, (board) => board.activityLogs)
  board!: Board;
    
  @ManyToOne(() => Card, (card) => card.ativityLogs, { nullable: true })
  card!: Card;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}