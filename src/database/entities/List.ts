import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Board } from './Board';
import { Card } from './Card';
import { ActivityLog } from './Activity_Log';
@Entity('lists')
export class ListEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @ManyToOne(() => Board, (board) => board.lists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board!: Board;

  @OneToMany(() => Card, (card) => card.list, { cascade: true, onDelete: 'CASCADE' })
  cards!: Card[];

  @Column('simple-array', { nullable: true })
  cardOrderIds!: string[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.list, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  activityLogs!: ActivityLog[];
}
