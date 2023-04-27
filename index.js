const Sequelize = require('sequelize');
const {DataTypes} = Sequelize
const sequelize = new Sequelize('SEQUELIZE','root','',{
    dialect : 'mysql',//here we are spcfind the db
    define:{
    freezeTableName:true//this is done when you want this to happen on each table
    }
})
 //sequelize.sync({force:true}) -->synchronous every tablein that database individually ath the same time

const User = sequelize.define('user',{
    user_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,  
  },
    username :{
      type:DataTypes.STRING,
      allowNull:false
  },
    password:{
       type:DataTypes.STRING 
  },
    age:{
       type:DataTypes.INTEGER,
       defaultValue:21   
  },
    wittCodeRcoks:{
       type:DataTypes.BOOLEAN,
       defaultValue:true,
  }
},{
  freezeTableName:true,//help to retain the name of table in database to be same as one of the model
  timestamps:false,//remove the createdAt && UpdateAt time stamps that are automatically created sequelize when we create a table
});


//synchronising table
User.sync({alter:true}).then(()=>{
const userCreated = User.build({username:'innocent',password:'123456',age:16,wittCodeRcoks:false})
return userCreated.save();//this saves the information in our databse
}).then((Data)=>{console.log("Data inserted")})
.catch((err)=>{console.log("Error occured in synchronising"+err)})
 


 //for dropping a table
          // User.drop();
          //sequelize.drop();->dropping every table in that database at the same time
           //sequelize.drop({match: /_test$/ });//here we specified the table that would be dropped that would be ending by '_test'

// sequelize.authenticate().then(()=>{
//     console.log("connection successfully")
// }).catch((err)=>{
//     console.log("error connecting to db")
// })













