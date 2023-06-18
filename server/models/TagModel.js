const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Tag = sequelize.define('Tag', 
    {

        VideoID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'video_tag'
        },
        
        TagText:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: 'video_tag'
        }
        
    }
);

Tag.associate = (models) => {
    Tag.belongsTo(models.Video, {foreignKey: 'VideoID', targetKey: 'id'})
}
  
module.expors = Tag;