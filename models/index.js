import pgconfig from '../config/db.postgres.config.js'
import Sequelize from 'sequelize';
import tutorial from './tutorial.model.js';

// console.log(pgconfig)
const sequelize = new Sequelize(pgconfig.DB, pgconfig.USER, pgconfig.PASSWORD, {
    host: pgconfig.host,
    dialect : pgconfig.dialect,
    port:pgconfig.PORT,
    operatorsAliases : false,
    pool:{
        max: pgconfig.pool.max,
        min: pgconfig.pool.min,
        acquire: pgconfig.pool.acquire,
        idle: pgconfig.pool.idle
    }
});



const db= {
    Sequelize :Sequelize,
    sequelize:sequelize,
    //sequelize is used here for to make schema inside the tutorial function,
    //Sequelize is the imported one..which we need to use for defining the standard datatypes from the 'sequelize' module.
    tutorials : tutorial(sequelize, Sequelize),
   
}

export default db 