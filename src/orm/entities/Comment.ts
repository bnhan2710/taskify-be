import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Card } from "./Card";
import { User } from "./User";
@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Card, (card) => card.comments,{ onDelete: 'CASCADE' })
  @JoinColumn({name: 'card_id'})
  card!: Card;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({name: 'user_id'})
  user!: User;

  @Column({ type: 'varchar', length: 255 })
  text!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
  
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date  
}