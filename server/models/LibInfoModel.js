const { sequelize, Sequelize } = require('../server');
const User = require('./userModel'); 

const LibraryInfo= sequelize.define('LibraryInfo', {
   
    LibID:{
        type:Sequelize.integer,
        allowNull:false,
        primaryKey:true,
      },
    UserID:{
      type:Sequelize.integer,
      allowNull:false,
      primaryKey:true,
    },
    LibName:{
        type:Sequelize.STRING(255),
        allowNull:false,
    }
  });
  
  LibraryInfo.belongsto(User, { foreignKey: 'UserID' });
  module.exports=LibraryInfo;
