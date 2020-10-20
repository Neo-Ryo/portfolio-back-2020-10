const Sequelize = require('sequelize')
const sequelizeInstance = require('../sequelize')

const Counts = sequelizeInstance.define('Counts', {
    uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
})

module.exports = Counts
