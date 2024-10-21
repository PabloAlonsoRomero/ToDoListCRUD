import express , {Request, Response} from "express";
import { dbConnection } from "./db/init";
import { Tarea } from "./db/models/tarea.model";

const app = express();

app.use(express.json());
dbConnection();

// Obtener todas las tareas
app.get("/todos", async (req: Request, res: Response) => {
    try {
        const tareas = await Tarea.findAll();
        if (!tareas) {
            throw { status: 404, message: "No se encontraron tareas"}
        }
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas"})
    }
})

app.listen(3000, () => {
    console.log("Aplicacion ejecutandose en el puerto 3000")
})