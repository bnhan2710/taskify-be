import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BoardInvitationStatus } from '../../shared/common/enums/board-invitation-status';
@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  message!: string;

  @Column({
    type: 'enum',
    enum: BoardInvitationStatus,
    default: BoardInvitationStatus.PENDING,
  })
  status!: BoardInvitationStatus;

  @Column({ nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ nullable: false, name: 'board_id' })
  boardId!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
