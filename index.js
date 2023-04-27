const Sequelize = require('sequelize');
const sequelize = new Sequelize('SEQUELIZE','root','',{
    dialect : 'mysql'
})

const User = sequelize.define('user',{
    username :{
      type:Sequelize.DataTypes.STRING,
      allowNull:false
    },
    password:{
       type:Sequelize.DataTypes.STRING 
    },
    age:{
       type:Sequelize.DataTypes.INTEGER,
       defaultValue:21   
    }
});

User.sync().then(()=>{
console.log("table and model saved succcessfully")
}).catch((err)=>{
console.log("Error occured in synchronising"+err)
})

// sequelize.authenticate().then(()=>{
//     console.log("connection successfully")
// }).catch((err)=>{
//     console.log("error connecting to db")
// })













