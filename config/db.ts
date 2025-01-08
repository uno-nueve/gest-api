import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI!);
        console.log("✅ Conexión exitosa con la base de datos");
    } catch (error) {
        console.error("❌ Error estableciendo conexión con base de datos:", error);
        process.exit(1);
    }
};

export default connectDB;
