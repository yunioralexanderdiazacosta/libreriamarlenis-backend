const express = require('express')
const copiasdanadas = express.Router()
const cors = require('cors')

const CopiaDanada = require('../modelos/CopiaDanada')
copiasdanadas.use(cors())

copiasdanadas.post('/', (req, res) => {
	const dia = new Date()
	const datos = {
		cantidad: req.body.cantidad,
		venta_id: req.body.venta_id,
		created_at: dia
	}

	CopiaDanada.create(datos)
	.then(
		res.json({ message: 'Datos almacenados correctamente' })
	)
	.catch(err => {
		console.log(err)
	})
})
module.exports = copiasdanadas