// const { sequelize, Sequelize } = require('../server')
// const User = require('./userModel'); 
// const Channel = require('./channelModel'); 
	
// const Subscriber=sequelize.define('Subscriber', {
//     UserId: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
      
//     },
//     ChannelID:{
//       type:Sequelize.integer,
//       allowNull:false,
//       primarykey:true,
//     },
//     Subbed_At:{
//         type:Sequelize.DATE,
//         allowNull:false,
//     }
//   });
  
//   User.belongsToMany(Channel, {
//     through: Subscriber,
//     foreignKey: 'UserId',
//     otherKey: 'ChannelID',
//   });
//   Channel.belongsToMany(User, {
//     through: Subscriber,
//     foreignKey: 'ChannelID',
//     otherKey: 'UserId',
//   });
//    module.exports=Subscriber;

