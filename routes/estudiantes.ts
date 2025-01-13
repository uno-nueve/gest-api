import { Router } from "express";
import { Estudiante, IEstudiante } from "../models/estudianteModel";
import { HydratedDocument } from "mongoose";
import { Imagen } from "../models/imagenModel";

const router = Router();

// Obtener todos los registros de estudiantes.
router.get("/estudiantes", async (req, res) => {
    const { curso } = req.query;
    // Si no existe un parámetro de filtro, devuelve todos los registros.
    if (!curso) {
        try {
            const estudiantes = await Estudiante.find();

            res.status(200).send(estudiantes);
        } catch (error) {
            res.status(500).send({
                message: "❌ Error obteniendo registros de estudiantes",
                error,
            });
        }
        return;
    }

    // Devuelve los registros cuyo valor para "cursos" coincida con el parámetro de filtro.
    try {
        const filtro = curso ? { cursos: { $in: [curso] } } : {};
        const estudiantesFiltrados = await Estudiante.find(filtro);

        if (!estudiantesFiltrados)
            return res.status(404).send({
                message: "⚠️ No se encontraron registros que coincidan con el criterio de busqueda",
            });

        res.status(200).send(estudiantesFiltrados);
    } catch (error) {
        res.status(500).send({ message: "❌ Error filtrando registros", error });
    }
});

// Obtener un registro por ID.
router.get("/estudiantes/:id", async (req, res) => {
    try {
        const estudiante = await Estudiante.findById(req.params.id).populate({ path: "imagenes" });

        if (!estudiante) return res.status(404).send("⚠️ Registro no encontrado");

        res.status(200).send(estudiante);
    } catch (error) {
        res.status(500).send({ message: "❌ Error obteniendo registro de estudiante", error });
    }
});

// Crear un nuevo registro de estudiante.
router.post("/estudiantes", async (req, res) => {
    try {
        const { nombre, apellido, email, cursos }: IEstudiante = req.body;

        const nuevoEstudiante: HydratedDocument<IEstudiante> = new Estudiante({
            nombre,
            apellido,
            email,
            cursos,
        });
        await nuevoEstudiante.save();

        res.status(201).send(nuevoEstudiante);
    } catch (error) {
        res.status(500).send({ message: "❌ Error creando registro de estudiante", error });
    }
});

// Actualizar un registro de estudiante por ID.
router.put("/estudiantes/:id", async (req, res) => {
    try {
        const estudianteActualizado = await Estudiante.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!estudianteActualizado)
            return res.status(404).send({ message: "⚠️ Registro no encontrado" });

        res.status(200).send(estudianteActualizado);
    } catch (error) {
        res.status(400).send({ message: "❌ Error actualizando el registro", error });
    }
});

// Eliminar un registro de estudiante por ID.
router.delete("/estudiantes/:id", async (req, res) => {
    try {
        const estudianteEliminado = await Estudiante.findByIdAndDelete(req.params.id);

        if (!estudianteEliminado)
            return res.status(404).send({ message: "⚠️ Registro no encontrado" });

        res.status(200).send({ message: "✅ Registro eliminado exitosamente" });
    } catch (error) {
        res.status(500).send({ message: "❌ Error eliminando el registro", error });
    }
});

// Actualizar el valor de "imagen" en un registro de estudiante por ID.
// La request acepta binaries.
router.patch("/estudiantes/:id/avatar", async (req, res) => {
    try {
        // Encuentra el estudiante.
        const estudiante = await Estudiante.findById(req.params.id);

        if (!estudiante) {
            return res.status(404).send({ message: "⚠️ Registro no encontrado" });
        }

        // Enlaza un event handler a un evento "data" en la request.
        req.on("data", async (data) => {
            // Construye un buffer basado en la "data" de la request.
            const buffer = Buffer.from(data).toString("base64");
            // Crea un registro de imagen.
            const imagen = await Imagen.create({ data: buffer });
            // Asigna el registro creado al registro de estudiante.
            estudiante.imagen = imagen._id;
        });
        // Guarda los cambios en Mongo.
        req.on("end", async () => await estudiante.save());

        res.status(201).send({ message: "✅ Imagen subida exitosamente", estudiante });
    } catch (error) {
        res.status(500).send({ message: "❌ Error subiendo imágen", error });
    }
});

export default router;
