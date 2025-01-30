import express from "express"
import http from "http"
import cors from "cors"
import {Server} from "socket.io"

const app=express()
app.use(cors())
const server=http.createServer(app)

const io=new Server (server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET", "POST"]
    }
})

let users={}

io.on("connection" ,(socket)=>{
    console.log(`new user connected : ${socket.id}`);
    
})




server.listen(3000,()=>{
    console.log(`server is running on port 3000`);
    
})