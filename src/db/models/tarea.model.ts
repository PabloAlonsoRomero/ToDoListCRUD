import { Column, DataType, Model, Table} from "sequelize-typescript";

@Table({
    tableName: 'tareas',
    freezeTableName: true
})
export class Tarea extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    completed!: boolean;
}