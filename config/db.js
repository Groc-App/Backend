import { set, connect } from "mongoose";
import { config } from "dotenv";

config({ path: "./config/config.env" });

const connectDB = async () => {
    try {
        set('strictQuery', false);
        const conn = connect(process.env.MONGO_URI, {
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
