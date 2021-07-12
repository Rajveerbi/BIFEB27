import db from '../models/index.js';
const Tutorials = db.tutorials;
const Op = db.Sequelize.Op; //
export const getAllTutorialsByTitle = (req, res)=>{
    const title = req.query.title
    var condition = title ? {title: {[Op.ilike]: `%${title}`}}: null;

    Tutorials.findAll({where : condition})
    //Tutorials.findAll({where :  {published:true}})
    .then(data => {
        res.send(data)
    })
    .catch(err=> {
        res.status(500).send(
            {
                message: err.message || "Some error occurred while retrieving tutorials"
            }
        )
    })
};
export const getTutorialByID = (req, res)=>{
    Tutorials.findByPk(req.params.id)
    .then(
        result => res.send(result)
    )
    .catch(
        err => res.status(500).send(err)
    )
}




//since we have created the schema but that schema/table doest not exist there in database.


// first a function..
// const tutorial = {
//     title:"qrgq3r",
//     description:"erbgre",
//     published:"ewrgr"
// }
// Tutorials.create(tutorial) 

export const createTutorial = (req, res)=>{
    if( req.body.description == null || req.body.title ==null){
        res.status(400).send({
            message: "Insufficient data..please try again"
        })
    }
    const tutorial ={
        title: req.body.title,
        published: req.body.published ? req.body.published : false,
        description : req.body.description
    }
    Tutorials.create(tutorial).then(
        (result)=>{
            res.status(201).send(result)
        }
    ).catch(
        (err)=>{
            res.status(500).send({
                message:err||"Internal DB Error"
            }    
            )
        }
    )
}

export const deleteTutorialByID = (req, res)=>{
    Tutorials.destroy(
        {where :{id:req.params.id}}
    ).then(
        (result)=>{
            if(result == 1){
                res.status(200).send({
                    message:"Tutorial was deleted"
                })
            }else{
                res.status(422).send({
                    message:"This id doesnot exist in the table"
                })
            }
        }
    ).catch(
        (err)=>{
            res.status(500).send({
                message:err||"Internal DB Error"
            }    
            )
        }
    )
}

export const deleteTutorials = (req, res)=>{
    Tutorials.destroy(
        {
            where :{},
            truncate:false
        }
    ).then(
        (result)=>{
                res.status(200).send({
                    message:`${result} Tutorial was deleted`
                })
        }
    ).catch(
        (err)=>{
            res.status(500).send({
                message:err||"Internal DB Error"
            }    
            )
        }
    )
}





export const updateTutorialByID = (req, res) => {
    Tutorials.update(req.body, {
        where : {id : req.params.id}
    }).then(

        (result)=>{
            if(result == 1){
                res.status(200).send({
                    message:"Tutorial was updated"
                })
            }else{
                res.status(422).send({
                    message:"This id doesnot exist in the table"
                })
            }
        }
    ).catch(
        (err)=>{
            res.status(500).send({
                message:err||"Internal DB Error"
            }    
            )
        }
    )
}