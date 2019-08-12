const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'categorias_productos',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: Sequelize.STRING,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		estatus: Sequelize.STRING
	},
	{
		timestamps: false
	}
)