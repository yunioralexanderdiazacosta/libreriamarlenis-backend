const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'pedidos_compras',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		cantidad_compra: Sequelize.INTEGER,
		precio_compra: Sequelize.BIGINT,
		subtotal: Sequelize.BIGINT,
		producto_id: Sequelize.INTEGER,
		compra_id: Sequelize.INTEGER,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)