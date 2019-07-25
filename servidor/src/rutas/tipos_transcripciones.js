const express = require('express')
const tipoTranscripciones = express.Router()
const cors = require('cors')

const TipoTranscripcion = require('../modelos/TipoTranscripcion')
tipoTranscripciones.use(cors())

tipoTranscripciones.get('/', (req, res) =>{
	TipoTranscripcion.findAll()
	.then(listarTipos => {
		res.json(listarTipos)
	})
	.catch( err => {
		console.log(err)
	})
})
module.exports = tipoTranscripciones