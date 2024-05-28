import { AllowNull, Column, HasOne, Model, Table } from 'sequelize-typescript';
import { Profile } from './profile.model';

@Table({
  createdAt: true,
  updatedAt: false,
  defaultScope: {
    attributes: { exclude: ['id'] },
  },
})
export class User extends Model {
  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column({ unique: true })
  email: string;

  @Column
  role: string;

  @HasOne(() => Profile, { foreignKey: 'userId' })
  profile: Profile;
}
