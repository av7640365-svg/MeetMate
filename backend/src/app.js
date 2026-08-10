import express from "express";
import {createServer} from "node:http";


import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/user.routes.js"; 


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000)); 
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.use("/api/v1/users",userRoutes);
//mongodb+srv://Anurag:Anurag%409554@wanderlust.a9euzdh.mongodb.net/zoom-clone//
//mongodb+srv://anjaldev513_db_user:VOwIbTpbS1EpBa9H@cluster0.mi7y5ut.mongodb.net/video-call//
const start = async()=>{
    const connectmongoDB = await mongoose.connect("mongodb+srv://Anurag:Anurag%409554@wanderlust.a9euzdh.mongodb.net/zoom-clone");
server.listen(app.get("port"),()=>{
    console.log("Listening on port 8000")
});
// app.listen(8000,()=>{
//     console.log("listen at port 8000");
// });
}
start();