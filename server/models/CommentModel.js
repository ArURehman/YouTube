const { sequelize, Sequelize } = require('../server');

const User = require('./userModel'); 
const Video = require('./videoModel'); 

const Comment = sequelize.define('Comment', {
    ComID:{
        type:Sequelize.integer,
        allowNull:false,
        primarykey:true,
    },
    Parent_ComID:{
        type:Sequelize.INTEGER,
        allowNull:true,
    },
    UserID:{
      type:Sequelize.integer,
      allowNull:false,
    },
    VideoID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Com_Text:{
        type:Sequelize.STRING(255),
        allowNull:false,
    },
    Com_At:{
        type:Sequelize.DATE,
        allowNull:false,
    },

  });

  Comment.belongsto(User, { foreignKey: 'UserID' });
  Comment.belongsto(Video, { foreignKey: 'VideoID' });

  module.exports=Comment;
