import mongoose from "mongoose";

const ConnectDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected", conn.connection.host);
}
export default ConnectDB;
// wYN9Uda78KpSKUw9