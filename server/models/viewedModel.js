// const { sequelize, Sequelize } = require('../server');

// const User = require('./userModel'); 
// const Video = require('./videoModel'); 
	
// const Viewed = sequelize.define('Viewed', {
    
//     UserID:{
//       type:Sequelize.integer,
//       allowNull:false,
//       primaryKey:true,
//     },
//     VideoID: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//       },
    
//     Viewed_At:{
//         type:Sequelize.DATE,
//         allowNull:false,
//     }
//   });

//   Viewed.belongsto(User, { foreignKey: 'UserID' });
//   Viewed.belongsto(Video, { foreignKey: 'VideoID' });

//   module.exports=Viewed;
