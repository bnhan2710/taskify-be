import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Card } from "./Card";

@Entity('checklists')
export class Checklist {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    description!: string;

    @ManyToOne(() => Card, card => card.checklists,{ onDelete: 'CASCADE' })
    @JoinColumn({name: 'card_id'})
    card!: Card;

    @Column({ type: 'timestamp', nullable: true })
    dueDate?: Date;

    @Column({ type: 'boolean', default: false })
    isDone!: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date  
}