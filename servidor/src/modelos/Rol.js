const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'roles',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: Sequelize.STRING
	}
)