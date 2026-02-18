import mongoose from "mongoose";

const connection = {
    isConnected: false
}
if (!process.env.MONGO_URI) {
    throw new Error('Please provide MONGO_URI in the environment variables');
}
export const connectToDb = async () =>{
    try {
        if(connection.isConnected){
            console.log('Already connected to DB');
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URI || '');
        connection.isConnected = db.connections[0].readyState === 1;
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to DB');
    }
}