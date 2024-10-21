import { Sequelize } from "sequelize-typescript";
import { envs } from "../config/envs";
import { Tarea } from "./models/tarea.model";

export const db = new Sequelize({
    database: envs.MYSQL_DB,
    username: envs.MYSQL_USER,
    password: envs.MYSQL_PASSWORD,
    host: envs.MYSQL_HOST,
    port: 3306,
    dialect: "mysql", 
    models: [Tarea]
});

export const dbConnection = async () => {
    try {
        await db.sync({ alter: true});
        console.log('Database connected');
    } catch (error) {
        console.error(`Error connecting to the Database ${error}`);
    }
}