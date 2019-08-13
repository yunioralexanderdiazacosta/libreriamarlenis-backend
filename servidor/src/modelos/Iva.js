const Sequelize = require('sequelize')
const db = require('../db.js')


module.exports = db.sequelize.define(
	'impuestos',
	{
		id:
		{
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		valor: Sequelize.INTEGER,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)