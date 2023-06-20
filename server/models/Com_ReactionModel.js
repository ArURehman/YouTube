const sequelize = require('../database')
const {DataTypes} = require('sequelize')
	
const Comm_Reaction = sequelize.define('CommentReaction', 
    {
    
        UserID:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: 'Comm_Reaction'
        },
        CommentID: {
            type:  DataTypes.STRING,
            allowNull: false,
            unique: 'Comm_Reaction'
        },
        Reactions:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },
        Reaction_At:{
            type: DataTypes.DATE,
            allowNull:false,
        }
    }
);

Comm_Reaction.associate = (models) => {
    Comm_Reaction.belongsTo(models.User, {foreignKey: 'UserID', targetKey: 'id'})
    Comm_Reaction.belongsTo(models.Video, {foreignKey: 'CommentID', targetKey: 'id'})
}

module.exports = Comm_Reaction;