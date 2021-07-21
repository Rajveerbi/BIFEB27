import pgdb from "../models/index.js"
const ROLES = pgdb.ROLES
const User = pgdb.users

export const checkduplicateusernameoremail=(req,res,next)=>{
     User.findOne({
         where :{username : req.body.username}
     }).then(user=>{
         if(user){
             res.status(400).send({message : "username already exists"})
             return;
         }
    
     User.findOne({
        where :{email : req.body.email}
    }).then(user=>{
        if(user){
            res.status(400).send({message : "email already exists"})
            return;
        }
        next();
    })
})
}

export const checkrolesexisted=(req,res,next)=>{
         if(req.body.roles){
             for(let i=0;i<req.body.roles.length;i++){
                 if(!ROLES.includes(req.body.roles[i])){
                     res.status(400).send({message : "failed role not exits"+req.body.roles[i]})
                     return;
                 }
                 
             }
         }
         next();
}