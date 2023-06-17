const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Subscriber = sequelize.define('Subscriber', {

            UserID: {

                type: DataTypes.STRING,
                allowNull: false,
                unique: 'user_channel',
            
            },
            ChannelID:{

                type:DataTypes.STRING,
                allowNull: false,
                unique:'user_channel',

            },
            Subbed_At:{

                type:DataTypes.DATE,
                allowNull:false,
            }
        },
        {
            primaryKey: false,
            timestamps: false,
        }
    );

Subscriber.associate = (models) => {
    Subscriber.belongsTo(models.User, {foreignKey: 'UserID', targetKey: 'id'})
    Subscriber.belongsTo(models.Channel, {foreignKey: 'ChannelID', targetKey: 'id'})
}
 
module.exports=Subscriber;