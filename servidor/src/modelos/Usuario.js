const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'usuarios',
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
		correo: Sequelize.STRING,
		telefono: Sequelize.STRING,
		usuario: Sequelize.STRING,
		clave: Sequelize.STRING,
		estatus: Sequelize.INTEGER,
		rol_id: Sequelize.INTEGER,
		created_at: 
		{
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)
