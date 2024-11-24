import { Column, Entity, ManyToOne, OneToMany,  JoinColumn } from "typeorm";
import { BaseEntity } from "../../common/base/base-entity"; 
import { Board } from "./Board"
import { Card } from "./Card";
@Entity('lists')
export class List extends BaseEntity{
    @Column({ type: "varchar", length: 255 })
    title!: string;

    @ManyToOne(() => Board, board => board.lists,{ onDelete: 'CASCADE' })
    @JoinColumn({name: 'board_id'})
    board!: Board
    
    @OneToMany(() => Card, card => card.list , { cascade: true, onDelete: 'CASCADE' })
    cards!: Card[];

    @Column("simple-array", { nullable: true })
    cardOrderIds!: string[];  
}
