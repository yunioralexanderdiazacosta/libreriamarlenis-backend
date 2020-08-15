const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'inv_archivos',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		archivo: Sequelize.STRING,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)