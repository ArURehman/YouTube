const { sequelize, Sequelize } = require('../server')
const Channel = require('./channelModel'); 

const Video = sequelize.define('Video', {
    VideoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ChannelID:{
      type:Sequelize.integer,
      allowNull:false,
    },
    VideoDescription: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    VideoFile: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    VideoThumbnail: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  });
  
  Channel.hasMany(Video,{foreignkey:'ChannelID'});
  module.exports=Video;
