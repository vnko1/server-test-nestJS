import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  createdAt: false,
  updatedAt: false,
  defaultScope: {
    attributes: { exclude: ['userId'] },
  },
})
export class Profile extends Model {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @Column
  state: string;

  @AllowNull(false)
  @Column
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User, { as: 'user' })
  user: User;
}
