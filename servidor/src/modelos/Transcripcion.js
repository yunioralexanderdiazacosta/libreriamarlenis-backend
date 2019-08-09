const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'transcripciones',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		titulo: Sequelize.STRING,
		contenido: Sequelize.STRING,
		fecha_entrega: Sequelize.STRING,
		monto: Sequelize.INTEGER,
		archivo_inv: Sequelize.INTEGER,
		archivo_tarea: Sequelize.INTEGER,
		estatus_tarea: Sequelize.INTEGER,
		estatus_entrega: Sequelize.INTEGER,
		tiposTranscripcioneId: Sequelize.INTEGER,
		ventaId: Sequelize.INTEGER,
		usuarioId: Sequelize.INTEGER,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		updated_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}

)