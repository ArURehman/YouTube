const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Channel = sequelize.define('Channel', {

        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        UserID:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        B_email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Banner_Pic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);

Channel.associate = (models) => {
    Channel.belongsTo(models.User, {foreignKey: 'UserID', targetKey: 'id'})
}

module.exports = Channel;