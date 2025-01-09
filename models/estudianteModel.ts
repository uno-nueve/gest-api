import { model, Schema } from "mongoose";

export interface IEstudiante {
    nombre: string;
    apellido: string;
    email: string;
    cursos: string[];
}

const estudianteSchema = new Schema<IEstudiante>({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cursos: [
        { type: String, enum: ["Matemática", "Historia", "Ciencias", "Arte"], required: true },
    ],
});

const Estudiante = model<IEstudiante>("estudiantes", estudianteSchema);
export { Estudiante };
