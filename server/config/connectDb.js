import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");
    } catch (error) {
        console.log(`Database Error ${error}`);
        process.exit(1);
    }
}

export default connectDb;