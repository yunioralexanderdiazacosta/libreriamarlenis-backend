const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'productos',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: Sequelize.STRING,
		precio_venta: Sequelize.INTEGER,
		stock: Sequelize.INTEGER,
		estado: Sequelize.INTEGER,
		categoriasProductoId: Sequelize.INTEGER,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)