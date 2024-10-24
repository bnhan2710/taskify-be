import { Column, Entity, JoinTable,OneToOne ,  ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { Board } from "./Board"
import { Card } from "./Card";
@Entity('lists')
export class List {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @ManyToOne(() => Board, board => board.lists )
    board!: Board
    
    @OneToMany(() => Card, card => card.list)
    cards!: Card[];
}
