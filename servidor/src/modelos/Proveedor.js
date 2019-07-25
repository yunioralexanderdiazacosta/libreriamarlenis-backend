const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'proveedores',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		razon_social: Sequelize.STRING,
		contacto: Sequelize.STRING,
		telefono: Sequelize.STRING,
		correo: Sequelize.STRING,
		direccion: Sequelize.STRING,
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