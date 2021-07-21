const role= (sequelize, Sequelize)=>{
    const Role = sequelize.define("role", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey : true
        },
        name: {
            type: Sequelize.STRING
        },
       
    }, {
    
       timestamps:true
    })
    return Role;
}
export default role