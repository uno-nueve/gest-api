import { model, Schema } from "mongoose";

const imagenSchema = new Schema({
    data: { type: String },
});

const Imagen = model("imagenes", imagenSchema);
export { Imagen };
