const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'clientes',
	{
		id: 
		{
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		cedula: Sequelize.STRING,
		nombres: Sequelize.STRING,
		apellidos: Sequelize.STRING,
		direccion: Sequelize.STRING,
		telefono: Sequelize.STRING,
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