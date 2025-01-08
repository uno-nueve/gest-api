import { config } from "dotenv";
config();
import express from "express";
import cors, { CorsOptions } from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.PORT || "localhost";

const corsOptions: CorsOptions = {
    origin: "*",
};
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto: http://${HOST}:${PORT}`);
});
