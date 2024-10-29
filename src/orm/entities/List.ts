import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Board } from "./Board"
import { Card } from "./Card";
@Entity('lists')
export class List {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @ManyToOne(() => Board, board => board.lists)
    @JoinColumn({name: 'board_id'})
    board!: Board
    
    @OneToMany(() => Card, card => card.list)
    cards!: Card[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date  
}
