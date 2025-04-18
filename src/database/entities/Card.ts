import { Column, Entity, ManyToOne, OneToMany, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../shared/base/base-entity';
import { ListEntity } from './List';
import { Attachment } from './Attachment';
import { Comment } from './Comment';
import { ActivityLog } from './Activity_Log';
import { Checklist } from './Checklist';
import { User } from './User';
@Entity('cards')
export class Card extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  //cover image
  @Column({ type: 'text', nullable: true })
  cover!: string;

  @ManyToOne(() => ListEntity, (list) => list.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list!: ListEntity;

  @ManyToMany(() => User, (user) => user.cards)
  @JoinTable({
    name: 'card_member',
    joinColumn: { name: 'card_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'member_id', referencedColumnName: 'id' },
  })
  member?: User[];

  @OneToMany(() => Checklist, (checklist) => checklist.card, { cascade: true, onDelete: 'CASCADE' })
  checklists!: Checklist[];

  @OneToMany(() => Comment, (comment) => comment.card, { cascade: true, onDelete: 'CASCADE' })
  comments!: Comment[];

  @OneToMany(() => Attachment, (attachment) => attachment.card, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  attachments!: Attachment[];

  @OneToMany(() => ActivityLog, (activity_logs) => activity_logs.card, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  ativityLogs!: ActivityLog[];
}
