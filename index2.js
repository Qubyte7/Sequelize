const Sequelize = require('sequelize');
const {DataTypes,Op,Model} = Sequelize
const sequelize = new Sequelize('sequelize1','root','',{
    dialect:'mysql',
    host :'localhost'
})
const Person = sequelize.define('person',{
    firstname:{
        type:DataTypes.STRING,
        allowNull:false,
    get(){
       const rawValue = this.getDataValue('username');
       return rawValue.toUpperCase();
    },
},
    lastName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    age:{
        type:DataTypes.NUMBER,
        defaultValue:12
    }
},{
freezeTableName:true,
timestamps:false
})



// try{
//     sequelize.authenticate();
//     console.log("connection has been established");
// }catch(err){
//     console.log(err)
// }  


Person.sync({alter:true})
.then(()=>{
    Person.create({firstname:"Mugisha",lastName:"Shami Innocent",age:15})
}).then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})































