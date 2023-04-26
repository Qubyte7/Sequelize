const Sequelize = require('sequelize');
const sequelize = new Sequelize('SEQUELIZE','root','',{
    dialect : 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log("connection successfully")
}).catch((err)=>{
    console.log("error connecting to database")
})













