import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  verificationToken: string;

  @Column({ defaultValue: false })
  isVerified: boolean;
}