
import db from "../models/index.js"
import {secret} from "../config/auth.config.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'


const User = db.users
const Role = db.roles
const Op = db.Sequelize.Op


export const signup = (req, res)=>{
    User.create({
        username : req.body.username,
        email : req.body.email,
        password : bcryptjs.hashSync(req.body.password, 8)    
    })
    .then((user)=>{
        if(req.body.roles){
            Role.findAll({
                where:{
                    name:{
                        [Op.or]:req.body.roles
                    }
                }
            }).then(roles=>{
                user.setRoles(roles).then(()=>{
                    res.status(201).send({
                        message:"User was successfully registered"
                    })
                })
            })
        }
    })
}



export const signin = (req, res) => {
    user.findone({ where: { username: req.body, username } })
        .then((user) => {
            if (!user){
                res.status(404).send({ message: "user notfound" })
            }


            var Passwordisvalid = bcryptjs.compareSync(
                req.body.password,
                user.password
            )
            if (!Passwordisvalid) {
                req.status(401).send({ message: "invalid password" })
            }

            var token = jwt.sign({ id: user.id }, secret,{
                expiresin: 86400
            });

            var authorities = []
            user.getRoles().then(roles => {
                for (let i = 0; i < role.length; i++) {
                    authorities.push("Role" + role[i].name.toupperCase())
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accesstoken: token
                })
            })

        })
}