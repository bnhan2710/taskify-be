import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "../../common/base/base-entity";
import { List } from "./List";
import { Attachment } from "./Attachment";
import { Comment } from "./Comment";
import { ActivityLog } from "./Activity_Log";
import { Checklist } from "./Checklist";
@Entity('cards')
export class Card extends BaseEntity{
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @ManyToOne(() => List, (list) => list.cards,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list!: List;

  @OneToMany(()=> Checklist , checklist => checklist.card, { cascade: true, onDelete: 'CASCADE' })
  checklists!:Checklist[]

  @OneToMany(() => Comment, comment => comment.card ,{ cascade: true, onDelete: 'CASCADE' })
  comments!: Comment[];

  @OneToMany(() => Attachment, attachment => attachment.card ,{ cascade: true, onDelete: 'CASCADE' })
  attachments!: Attachment[];

  @OneToMany(() => ActivityLog , activity_logs => activity_logs.card, { cascade: true, onDelete: 'CASCADE' })
  ativityLogs!:ActivityLog[]
}