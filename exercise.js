const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const zlib =  require('zlib');
const {DataTypes,Op}= Sequelize;
const sequelize  =new Sequelize('sequelize1','root','',{
    host:'localhost',
    dialect:'mysql',
    define:{
        freezeTableName:true
    }
})
// try{
//     sequelize.authenticate();
//     console.log("connection has been established");
// }catch(err){
//     console.log(err)
// }

const Student  = sequelize.define('student',{
    student_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
       type:DataTypes.STRING,
       allowNull:false,
       validate:{
       len:[4,20] 
       },
       get(){//modifies how data is displayed when being retrieved
        const rawValue = this.getDataValue('name');
        return rawValue.toUpperCase();
    },
   
},
    favorite_class:{
        type:DataTypes.STRING,
        defaultValue:"Computer Science"
    },
    //normally it is used for passwords
   
    subcribed_to_wittcode:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    description:{
        type:DataTypes.STRING,
    // set(value){
    //     const compressed = zlib.deflateSync(value).toString('base64');
    //     this.setDataValue('description',compressed)
    // },
    // get(){
    //     const value = this.getDataValue('description');
    //     const uncompressed = zlib.inflateSync(Buffer.from(value,'base64'));
    //     return uncompressed;
    // }
    }
},{timestamps:false})

Student.sync({alter:true}).then(()=>{
//     return Student.bulkCreate([
//         {name:"Mugisha",favorite_class:"Class B",subcribed_to_wittcode:false,description:"Hey this is me"},
//         {name:"Ganza",subcribed_to_wittcode:true, description:"This is my little brother"},
//         {name:"sabrina", description:"This also my little sister"},
//         {name:"Michael",favorite_class:"Robotics",subcribed_to_wittcode:true, description:"hey this is my sibling"}
//     ])
// },{validate:true}
// return Student.findAll({attributes:['name','favorite_class']})
return Student.create({name:"Mugisha",favorite_class:"Class B",subcribed_to_wittcode:false,description:"Hey this is me"})

}
)

.then((data)=>{
//   data.forEach((element)=>{
//         console.log(element.toJSON())
//     })
// return data.findAll({attributes:['name','favorite_class']})
// console.log(data)
console.log(data.name)
console.log(data.favorite_class)
console.log(data.subcribed_to_wittcode)
console.log(data.description)
})
.catch((error)=>{
    console.log("Error occured"+error)
})



// Student.sync({alter:true}).then(()=>{
//     return Student.findOne();
//     return Student.sum('student_id')
//     return Student.findAll({attributes:[sequelize.fn('SUM',sequelize.col('student_id')),'num_student']})
//     return Student.findAll({attributes:['name'],where:{[Op.or]:{favorite_class:"Computer Science",subcribed_to_wittcode:true}}})
// }).then((data)=>{
//     // data.forEach((element)=>{
//     //     console.log(element.toJSON())
//     // })
// console.log(data.name)

// })
// .catch((error)=>{
//     console.log("Error occured"+error)
// })





















