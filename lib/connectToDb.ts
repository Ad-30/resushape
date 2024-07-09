import mongoose, { mongo } from "mongoose";

type ConnectionObject = {
    isConnected: number;
}

const connection: ConnectionObject = {
    isConnected: 0
};

const connectToDb = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {
            dbName: "ResuShape",
        });

        connection.isConnected = db.connections[0].readyState
        console.log("Connected to database");

    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
};

export default connectToDb;