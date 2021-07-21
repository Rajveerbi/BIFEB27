import express from "express"
import bodyParser from "body-parser"
import userRouter from "./Routes/users.js"
import authrouter from "./Routes/auth.routes.js"
import  tutorialrouter  from "./Routes/tutorial.js"
import pgdb from './models/index.js';
import mongoose from 'mongoose'
import cors from 'cors';




var corsoptions={
    origin : "http://localhost:8080"
}

const Role =pgdb.roles
function initializedb(){
   Role.create({
       id:1,
       name:"user"
   })
   Role.create({
    id:2,
    name:"admin"
})
Role.create({
    id:3,
    name:"moderator"
})
}


 pgdb.sequelize.sync({force:true}).then(
    (result)=>{
      initializedb()                
        console.log("++++++++++++++++++")
        console.log(result)
        console.log("++++++++++++++++++")
    }
    ).catch(
    (err)=>{
        console.log("@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(err)
        console.log("@@@@@@@@@@@@@@@@@@@@@@@")
    }
)

const dbURI='mongodb+srv://rajveer:rajveer123@cluster0.uro6j.mongodb.net/library?retryWrites=true&w=majority'
// const dbURI='mongodb+srv://rahul3:rahul3@cluster0.apqfl.mongodb.net/library?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(
        (result) => {
            console.log("Connected to the Database")
            server.listen(PORT)
            console.log("Server started successfully")
        }
    )
    .catch(
        (err)=>{
            console.log(err)
        }
    )

const server=express()
const PORT=8080
server.use(cors(corsoptions))
server.use((req,res,next)=>{
    res.header(
        "Access-control-Allow-header",
        "x-access-token",
        "origin",
        "Content-Type",
        "Accept"
    );
    next();
})
server.use(bodyParser.json())

// server.get("/",(req,res)=> res.send("Welcome to my library"))
var homepage=(req,res)=> res.send("Welcome to my library") //handle http://localhost:8888/
server.use("/api/auth",authrouter)
server.use("/user",userRouter)
server.use("/tut",tutorialrouter)
server.get("/",homepage)


