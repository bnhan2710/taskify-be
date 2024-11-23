import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Card } from "./Card";

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Card, (card) => card.attachments,{ onDelete: 'CASCADE' })
  card!: Card;

  @Column({ type: 'varchar', length: 255, nullable: true })
  attachName?: string;

  @Column({ type: 'varchar', length: 255 })
  URL!: string;

  @Column({ type: 'varchar', length: 255,nullable: true })
  cloudinaryPublicId?: string;

  @Column({ type: 'varchar', length: 50,nullable: true })
  fileType?: string;

  @Column({type: Boolean})
  isLink!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  uploadAt!: Date;
}