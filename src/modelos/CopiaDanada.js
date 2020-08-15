const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'copias_danadas',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		cantidad: Sequelize.INTEGER,
		venta_id: Sequelize.INTEGER,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)