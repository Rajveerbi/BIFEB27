import Jwt from "jsonwebtoken"
import {secret} from "../config/auth.config.js"
import db from "../models/index.js"

const User = db.Users
export const verifyToken=(req,res,next)=>{
    let token = req.header["x-access-token"]
    if(!token){
        return res.status(401).send({message : " no token provides"})
    }
    Jwt.verifyToken(token,secret,(err,decode)=>{
        if(err){
            return res.status(401).send({message : "unathorized"})
        }
        req.UserId=decode.Id
        next();
    })
}

export const isadmin=(req,res,next)=>{
    User.findbyPK(req.UserId)
    .then((user)=>{user.getRoles().then((roles)=>{
         for(let i=0;i<roles.length;i++){
             if(roles[i].name==="admin")
             console.log("user is admin")
             next()
             return
         }
         res.status(403).send({message : "forbiden"})
    })
})

}
const isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Moderator Role!"
        });
      });
    });
  };
  
  const isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
  
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Moderator or Admin Role!"
        });
      });
    });
  };
  

export const authJwt={
    verifyToken:verifyToken,
    isadmin : isadmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

