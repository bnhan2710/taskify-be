import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { User } from './User';
import { TokenEnum } from '../../shared/common/enums/token';

@Entity('tokens')
export class Token extends BaseEntity {
  @ManyToOne(() => User, (user) => user.tokens, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 255, unique: true })
  token!: string;

  @Column({
    type: 'enum',
    enum: TokenEnum,
    nullable: false,
  })
  type!: TokenEnum;

  @Column({ type: 'datetime', default: null })
  expires!: Date;

  @Column({ type: 'boolean', default: false })
  isBlacklisted!: boolean;
}
