const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Video = sequelize.define('Video', 
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        ChannelID:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        VideoDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        VideoTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        VideoFile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        VideoThumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        VideoVisibility: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        VideoViews: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }
);

Video.associate = (models) => {
    Video.belongsTo(models.Channel, {foreignKey: 'ChannelID', targetKey: 'id'})
}

module.exports = Video;