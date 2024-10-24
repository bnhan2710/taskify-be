import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Card } from "./Card";
@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Card, (card) => card.attachments)
  card!: Card;

  @Column({ type: 'varchar', length: 255 })
  fileName!: string;

  @Column({ type: 'varchar', length: 50 })
  fileType!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}