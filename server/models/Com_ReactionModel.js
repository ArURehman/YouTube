// const { sequelize, Sequelize } = require('../server');
// const Comment=require('./CommentModel');
// const User = require('./userModel'); 

// const Com_Reaction = sequelize.define('Com_Reaction', {
//     ComID:{
//         type:Sequelize.integer,
//         allowNull:false,
//         primarykey:true,
//     },
    
//     UserID:{
//       type:Sequelize.integer,
//       allowNull:false,
//       primarykey:true,
//     },
//     Reaction:{
//         type:Sequelize.BOOLEAN,
//         allowNull:true,
//     },
//     Reaction_At:{
//         type:Sequelize.DATE,
//         allowNull:true,
//     },

//   });
  
//   Com_Reaction.belongsto(User,{foreignkey:'UserID'});
//   Com_Reaction.belongsto(Comment,{foreignkey:'ComID'});

//   module.exports=Com_Reaction;
