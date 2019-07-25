const express = require('express')
const tipocopias = express.Router()
const cors = require('cors')

const TipoCopia = require('../modelos/TipoCopia')
tipocopias.use(cors())


tipocopias.get('/', (req, res ) => {
	TipoCopia.findAll()
	.then(listarTipos => {
		res.json(listarTipos)
	})
	.catch( err => {
		console.log(err)
	})
})

tipocopias.get('/:id', (req, res) => {
	const id = req.params.id
	TipoCopia.findOne({
		where: {
			id: id
		}
	})
	.then(mostrarTipo => {
		res.json(mostrarTipo)
	})
	.catch(err => {
		console.log(err)
	})
})

module.exports = tipocopias

