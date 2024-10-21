import express , {Request, Response} from "express";
import { dbConnection } from "./db/init";
import { Tarea } from "./db/models/tarea.model";

const app = express();

app.use(express.json());
dbConnection();

app.listen(3000, () => {
    console.log("Aplicacion ejecutandose en el puerto 3000")
})