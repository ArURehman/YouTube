const { sequelize, Sequelize } = require('../server');

const User = require('./userModel'); 
const Video = require('./videoModel'); 
	
const Video_Reaction = sequelize.define('Video_Reaction', {
    
    UserID:{
      type:Sequelize.integer,
      allowNull:false,
      primaryKey:true,
    },
    VideoID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    Reaction :{
        type:Sequelize.BOOLEAN,
        allowNull:true,
    },
    Reaction_At:{
        type:Sequelize.DATE,
        allowNull:true,
    }
  });

  Video_Reaction.belongsto(User, { foreignKey: 'UserID' });
  Video_Reaction.belongsto(Video, { foreignKey: 'VideoID' });
  
  module.exports=Video_Reaction;
