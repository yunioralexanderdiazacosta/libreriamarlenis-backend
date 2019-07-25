const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'ventas',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		total: Sequelize.INTEGER,
		clienteId: Sequelize.INTEGER,
		usuario_id: Sequelize.INTEGER,
		estatus: Sequelize.INTEGER,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)