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
        required: [true, "⚠️ Nombre es un campo requerido"],
    },
    apellido: {
        type: String,
        required: [true, "⚠️ Apellido es un campo requerido"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "⚠️ Formato de email inválido"],
    },
    cursos: [
        {
            type: String,
            enum: {
                values: ["Matemática", "Historia", "Ciencias", "Arte"],
                message: "⚠️ {VALUE} no es un valor permitido",
            },
            required: true,
        },
    ],
});

const Estudiante = model<IEstudiante>("estudiantes", estudianteSchema);
export { Estudiante };
