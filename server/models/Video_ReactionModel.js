const sequelize = require('../database')
const {DataTypes} = require('sequelize')
	
const Video_Reaction = sequelize.define('VideoReaction', 
    {
    
        UserID:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: 'video_reaction'
        },
        VideoID: {
            type:  DataTypes.STRING,
            allowNull: false,
            unique: 'video_reaction'
        },
        Reaction :{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },
        Reaction_At:{
            type: DataTypes.DATE,
            allowNull:false,
        }
    }
);

Video_Reaction.associate = (models) => {
    Video_Reaction.belongsTo(models.User, {foreignKey: 'UserID', targetKey: 'id'})
    Video_Reaction.belongsTo(models.Video, {foreignKey: 'VideoID', targetKey: 'id'})
}

module.exports = Video_Reaction;