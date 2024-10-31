import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { List } from "./List";
import { Attachment } from "./Attachment";
import { Comment } from "./Comment";
import { ActivityLog } from "./Activity_Log";
import { Checklist } from "./Checklist";
@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @ManyToOne(() => List, (list) => list.cards)
  @JoinColumn({ name: 'list_id' })
  list!: List;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(()=> Checklist , checklist => checklist.card)
  checklists!:Checklist[]

  @OneToMany(() => Comment, comment => comment.card)
  comments!: Comment[];

  @OneToMany(() => Attachment, attachment => attachment.card)
  attachments!: Attachment[];

  @OneToMany(() => ActivityLog , activity_logs => activity_logs.card)
  ativityLogs!:ActivityLog[]
}