const { sequelize, Sequelize } = require('../server')
const Channel = require('./channelModel'); 

const Link= sequelize.define('Link', {
    
   
    ChannelID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    Link:{
        type:Sequelize.STRING(255),
        allowNull:true,
    },
    LinkName:{
        type:Sequelize.STRING(255),
        allowNull:true,
    }
  });

  Link.belongsto(Channel, { foreignKey: 'ChannelID' });
  module.exports=Link;

