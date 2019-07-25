const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'tipos_copias',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		descripcion: Sequelize.STRING,
		precio: Sequelize.INTEGER,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)