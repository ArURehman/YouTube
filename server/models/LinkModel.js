const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Link = sequelize.define('Link', 
    {
   
        ChannelID: {

            type: DataTypes.STRING,
            allowNull: false,
            unique: 'channel_links'

        },
        Link:{

            type:DataTypes.STRING,
            allowNull: false,
            unique: 'channel_links'

        },
        LinkName:{

            type:DataTypes.STRING,
            allowNull: false,
            unique: 'channel_links'

        }
    }

);

Link.associate = (models) => {
    Link.belongsTo(models.Channel, {foreignKey: 'ChannelID', targetKey: 'id'})
}

module.exports = Link;