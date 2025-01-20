import "dotenv/config";
import express, { urlencoded } from "express";
import cors, { CorsOptions } from "cors";
import connectDB from "./config/db";
import estudiantesRouter from "./routes/estudiantes";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.PORT || "localhost";
const corsOptions: CorsOptions = {
    origin: "*",
};

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api", estudiantesRouter);

app.get("/", (req, res) => {
    res.send("Hello world");
});

connectDB()
    .then(() =>
        app.listen(PORT, () =>
            console.log(`🚀 Servidor corriendo en puerto: http://${HOST}:${PORT}`)
        )
    )
    .catch((error) => console.error("❌ Error inicializando el servidor"));
