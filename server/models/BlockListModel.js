const { sequelize, Sequelize } = require('../server')
const Channel = require('./channelModel'); 
const User=require('./userModel');
	
const BlockList= sequelize.define('BlockList', {
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      
    },
    ChannelID:{
      type:Sequelize.INTEGER,
      allowNull:false,
    },
    
  });
  
  BlockList.belongsto(Channel,{foreignkey:'ChannelID'});
  BlockList.belongsto(User,{foreignkey:'UserID'});
  module.exports=BlockList;
