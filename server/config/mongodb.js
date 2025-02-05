import mongoose from "mongoose";

const ConnectDB = async()=>{
    const conn = await mongoose.connect("mongodb+srv://krrohan129:UJggwPcbB1YR0Dpz@cluster0.54nho.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected", conn.connection.host);
}
export default ConnectDB;