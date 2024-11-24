import { Column, Entity,  PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { BaseEntity } from "../../common/base/base-entity";
import { Card } from "./Card";

@Entity('attachments')
export class Attachment extends BaseEntity{
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