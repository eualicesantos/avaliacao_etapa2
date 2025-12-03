import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.HOST
const DB_DIALECT = process.env.DB_DIALECT

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    dialect: DB_DIALECT,
    timezone: '-03:00',
})

sequelize.authenticate().then(function (){
    console.log('Conectado ao banco com sucesso ao '+DB_NAME+'!');
}).catch(function (error) {
    console.log('Falha na conexão: '+error);
})

export default {Sequelize, sequelize}