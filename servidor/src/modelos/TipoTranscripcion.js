const Sequelize = require('sequelize')
const db = require('../db.js')

module.exports = db.sequelize.define(
	'tipos_transcripciones',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		descripcion: Sequelize.STRING,
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)