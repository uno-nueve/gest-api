import { Router } from "express";
import { Estudiante, IEstudiante } from "../models/estudianteModel";
import { HydratedDocument } from "mongoose";

const router = Router();

router.get("/estudiantes", async (req, res) => {
    const { curso } = req.query;
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

router.get("/estudiantes/:id", async (req, res) => {
    try {
        const estudiante = await Estudiante.findById(req.params.id);

        if (!estudiante) return res.status(404).send("⚠️ Registro no encontrado");

        res.status(200).send(estudiante);
    } catch (error) {
        res.status(500).send({ message: "❌ Error obteniendo registro de estudiante", error });
    }
});

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

export default router;
