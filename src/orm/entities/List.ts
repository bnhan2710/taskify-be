import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Board } from "./Board"
import { Card } from "./Card";
@Entity('lists')
export class List {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @ManyToOne(() => Board, board => board.lists,{ onDelete: 'CASCADE' })
    @JoinColumn({name: 'board_id'})
    board!: Board
    
    @OneToMany(() => Card, card => card.list , { cascade: true, onDelete: 'CASCADE' })
    cards!: Card[];

    @Column("simple-array", { nullable: true })
    cardOrderIds!: string[];  

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date  
}
