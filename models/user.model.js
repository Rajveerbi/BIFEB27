  
const user= (sequelize, Sequelize)=>{
    const User = sequelize.define("user", {
        username:{
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        }
    }, {
    
       timestamps:true
    })
    return User;
}
export default user