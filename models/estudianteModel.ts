import { model, Schema, Types } from "mongoose";

export interface IEstudiante {
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    tutor: string;
    telefono: string;
    grado: string;
    docente: string;
    cursos: { curso: string; nota: number }[];
    observaciones: string;
    imagen?: Types.ObjectId;
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
    direccion: {
        type: String,
        required: true,
        match: [/^[A-Za-z\s]+(?:\d+)?[A-Za-z0-9\s,.]+$/, "⚠️ Formato de dirección inválido"],
    },
    tutor: {
        type: String,
        required: [true, "⚠️ Tutor es un campo requerido"],
    },
    telefono: {
        type: String,
        required: [true, "⚠️ Teléfono es un campo requerido"],
    },
    grado: {
        type: String,
        required: [true, "⚠️ Año es un campo requerido"],
    },
    docente: {
        type: String,
        required: [true, "⚠️ Docente es un campo requerido"],
    },
    cursos: [
        {
            curso: {
                type: String,
                enum: {
                    values: [
                        "Matemática",
                        "Historia",
                        "Biología",
                        "Arte",
                        "Lengua",
                        "Educación Física",
                        "Física",
                        "Química",
                        "Inglés",
                    ],
                    message: "⚠️ {VALUE} no es un valor permitido",
                },
                required: true,
            },
            nota: {
                type: Number,
            },
        },
    ],
    observaciones: {
        type: String,
    },
    imagen: {
        type: Types.ObjectId,
        ref: "imagenes",
    },
});

const Estudiante = model<IEstudiante>("estudiantes", estudianteSchema);
export { Estudiante };
