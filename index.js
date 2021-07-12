import express from "express"
import bodyParser from "body-parser"
import userRouter from "./Routes/users.js"
import  tutorialrouter  from "./Routes/tutorial.js"
import createtut from "./Routes/tutorial.js"
import pgdb from './models/index.js';
import mongoose from 'mongoose'

 pgdb.sequelize.sync()
//  .then(
//     ()=>{
//         initializeDB();
//         // console.log("++++++++++++++++++")
//         // console.log(result)
//         // console.log("++++++++++++++++++")
//     }
//     ).catch(
//     (err)=>{
//         console.log("@@@@@@@@@@@@@@@@@@@@@@@")
//         console.log(err)
//         console.log("@@@@@@@@@@@@@@@@@@@@@@@")
//     }
// )

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
server.use(bodyParser.json())

// server.get("/",(req,res)=> res.send("Welcome to my library"))
var homepage=(req,res)=> res.send("Welcome to my library") //handle http://localhost:8888/
server.use("/user",userRouter)
server.use("/tut",tutorialrouter)
server.use("/Create",createtut)
server.get("/",homepage)
