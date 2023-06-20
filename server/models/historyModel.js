const sequelize = require('../database')
const {DataTypes} = require('sequelize')
	
const History = sequelize.define('History', 

  {
    UserID:{
      type:DataTypes.STRING,
      allowNull:false,
      unique: 'video_views_unique'
    },
    VideoID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'video_views_unique'
    },
    WatchedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        unique: 'video_views_unique'
    } 
  }

);

History.associate = (models) => {
    History.belongsTo(models.Video, {foreignKey: 'VideoID', targetKey: 'id'})
    History.belongsTo(models.User, {foreignKey: 'UserID', targetKey: 'id'})
}

module.exports = History;