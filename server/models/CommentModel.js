const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Comment = sequelize.define('Comment', 
    {
        
        id:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true,
        },
        Parent_ComID:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        UserID:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        VideoID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Com_Text:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false,
        },

    }
    
);

Comment.associate = (models) => {
    Comment.belongsTo(models.User, {foreignKey: 'UserID', targetKey: 'id'})
    Comment.belongsTo(models.Video, {foreignKey: 'VideoID', targetKey: 'id'})
}

module.exports = Comment;