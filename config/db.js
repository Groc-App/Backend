import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config({ path: "./config/config.env" });

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;
