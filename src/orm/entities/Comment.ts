import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Card } from "./Card";
@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Card, (card) => card.comments)
  card!: Card;

  @Column({ type: 'varchar', length: 255 })
  text!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}