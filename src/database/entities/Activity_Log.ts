import {
  Column,
  Entity,
  JoinTable,
  OneToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Card } from './Card';
import { User } from './User';
import { Board } from './Board';
@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.activityLogs)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 255 })
  action!: string;

  @ManyToOne(() => Board, (board) => board.activityLogs, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board?: Board;

  @ManyToOne(() => Card, (card) => card.ativityLogs, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card?: Card;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
