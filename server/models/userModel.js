const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {

        id : {
            type: DataTypes.STRING,
            allowNull : false,  
            primaryKey : true
        },
        Email : {
            type : DataTypes.STRING,
            allowNull:false,
            unique : true,
        },
        UserName : {
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        Password : {
            type:DataTypes.STRING,
            allowNull:false,
        },
        Profile_Pic : {
            type:DataTypes.STRING,
            allowNull:false,
        },
        createdAt : {
            type: DataTypes.DATE,
            allowNull:false,
        },
        Notif_Check_At : {
            type: DataTypes.DATE,
            allowNull:true,
        },
        
    });

module.exports = User