import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Card } from './Card';

@Entity('checklists')
export class Checklist extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @ManyToOne(() => Card, (card) => card.checklists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card!: Card;

  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;

  @Column({ type: 'boolean', default: false })
  isDone!: boolean;
}
