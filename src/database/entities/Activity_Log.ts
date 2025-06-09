import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Card } from './Card';
import { User } from './User';
import { Board } from './Board';
import { ActivityType } from '../../shared/common/enums/activity';
import { ListEntity } from './List';

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: ActivityType,
    nullable: false,
  })
  type!: ActivityType;

  @ManyToOne(() => User, (user) => user.activityLogs)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Board, (board) => board.activityLogs, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board?: Board;

  @ManyToOne(() => ListEntity, (list) => list.activityLogs, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list?: ListEntity;

  @ManyToOne(() => Card, (card) => card.activityLogs, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card?: Card;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
