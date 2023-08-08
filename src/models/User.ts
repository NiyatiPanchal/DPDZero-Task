import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "user",
  timestamps: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({ type: DataType.STRING, unique: true })
  username!: string;

  @Column({ type: DataType.STRING, unique: true })
  email?: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  full_name!: string;

  @Column(DataType.INTEGER)
  age!: number;

  @Column(DataType.STRING)
  gender!: string;
}
