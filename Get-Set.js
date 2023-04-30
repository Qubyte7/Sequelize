const bcrypt = require('bcrypt');
const  zlib = require('zlib');
const Sequelize =require('sequelize');
const {DataTypes,Op} = Sequelize
const sequelize =  new Sequelize ('sequelize1','root','',{
    dialect:'mysql',
    host:"localhost",
    define:{
        freezeTableName:true,
        timestamps:false
    }

})


const Person1 = sequelize.define('person1',{
    person_id:{
     type:DataTypes.INTEGER,
     primaryKey:true,
     autoIncrement:true
    },
    PersonName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
     len:[2,90]
    }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value){    //remeber to use small letters
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value,salt);
            this.setDataValue('password',hash);
        }
    },
    description:{
        type:DataTypes.STRING,
    set(value){
        const compressed = zlib.deflateSync(value).toString('base64');
         this.setDataValue('description',compressed);
    },
    get(){
        const value = this.getDataValue('description');
        const uncompressed = zlib.inflateSync(Buffer.from(value,'base64'));
        return uncompressed;
    }
    }
})

Person1.sync({alter:true})
.then(()=>{
    return Person1.create({PersonName:"Innocent",age:16,password:"MUGISHA@123",description:"Hey Did you  know that you can compress and uncompress data"})
})
.then((data)=>{
    console.log(data.toJSON());
})
.catch((error)=>{
    console.log("HERE IS YOUR ERROR  "+error.message);
})

//Normally GETTERS : are used Modifying how datas are retrieved from the database but it does not change the content
 //         SETTERS:on the side this they modify data are storedin data base.
//deflateSync:turn our document into a buffer the we use .toString to get a text and this is in charged by base64
//inflateSync:take an ARG as a buffer from the description stored in or dataBase
   //Buffer.from is used to create new buffer with new ARG we pass


































