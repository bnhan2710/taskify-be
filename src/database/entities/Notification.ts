import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  message!: string;

  @Column({ default: 'invite' })
  status!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
