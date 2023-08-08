import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "data",
  timestamps: false,
})
export class Data extends Model<Data> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column(DataType.STRING)
  key!: string;

  @Column(DataType.STRING)
  value!: string;
}
