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

// Obtener una tarea por su ID
app.get("/todos/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        if (isNaN(Number(id))) {
            throw { status: 400, message: "El ID debe ser un número valido"}
        }
        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            throw { status: 404, message: "Tarea no encontrada"}
        }
        res.json(tarea);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea", error});
    }
})

// Crear una nueva tarea
app.post("/todos", async (req: Request, res: Response) => {
    try {
        const {title, description} = req.body;
        if (!title || !description) {
            throw { status:400, message: "El titulo y la descripcion son obligatorios"}
        }

        const newTarea = await Tarea.create({
            title: title,
            description: description,
            completed: false
        })
        res.status(201).json(newTarea);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error});
    }
})

app.listen(3000, () => {
    console.log("Aplicacion ejecutandose en el puerto 3000")
})