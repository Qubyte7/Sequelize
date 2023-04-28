const Sequelize = require('sequelize');
const {DataTypes,Op} = Sequelize
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
      allowNull:false,
      validate:{
        len :[2,20]
      }
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
           //first way
// const userCreated = User.build({username:'innocent',password:'123456',age:16,wittCodeRcoks:false})
// return userCreated.save();
             //Second way
// return  User.create({username:'Ganza',password:'123456',age:34,wittCodeRcoks:false})
            //Multiple Input
// return User.bulkCreate([
//   {username:'Ganza',password:'123456',age:34,wittCodeRcoks:false},
//   {username:'Sabrina',password:'654321',age:43,wittCodeRcoks:true}
// ],{validate:true})//for accepting validation


// return User.findAll({attributes:['username','password']});//Here i want these specified field to display
// return User.findAll({attributes:[['username','name'],['password','pwd']]});//Here display username as name and passwrd as pwd
// return User.findAll({attributes:[[sequelize.fn('SUM',sequelize.col('age')),'howOld']]});//here we are finding the sum of the age col values
// return User.findAll({attributes:{exclude : ['password']}});//excluding a field
// return User.findAll({attributes:['username'],where:{age:45}});
// return User.findAll({attributes:{where:{age:45,username:'ganza'}}});
// return User.findAll({limit:2});//return 2 rows
// return User.findAll({order:[['age','DESC']]});//ordering age in descending order
// return User.findAll({attributes:['username',[sequelize.fn('SUM',sequelize.col('age')),'sum_age']],group : 'username'});//rertun the name in dataBase with summing up tha ages of people with the same name
// return User.findAll({where:{[Op.or]:{username:'ganza',age:45}}});//find where the username = ganza OR where age = 45
// return User.findAll({where:{age:{[Op.gt]:25}}});//where age is greater than 25
// return User.findAll({where:sequelize.where(sequelize.fn('char_length',sequelize.col(username)),6)});//Username  equal to length6
                   //UPDATING 
return User.update({username:'pizza'},{where:{age:43}});//update name to pizza where age = 43
return User.update({username:"Yves"},{where:{age:{[Op.gt]:1}}})
                  //deleting
return User.destroy({where:{username:'pizza'}})
return User.destroy({truncate:true})//delete every thing from the table
                  //Utility functions
return User.max('age');
return User.sum('age',{where:{age:23}});


}).then((data)=>{
  // console.log("User created inserted")
  // console.log(data.toJSON())
  // data.username = 'pizza';
  // data.age = 23;
  // data.increment({age:2});
//return data.save({fields:['age']});//here age is the only one to be saved or changed
//return data.destroy();
//return data.reload();
         //How to display bulk Users
// data.forEach((element) => {
//     console.log(element.toJSON());
// });
        //Outputtiing all users
// data.forEach((element)=>{
//   console.log(element.toJSON())
// })
console.log(data)

})
// .then((data)=>{
//console.log("User returned to normal")
//console.log("User deleted")
// console.log("user Updated")
// console.log(data.toJSON())})
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













