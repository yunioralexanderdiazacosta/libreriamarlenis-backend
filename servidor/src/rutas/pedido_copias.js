const express = require('express')
const pedidoCopias = express.Router()
const cors = require('cors')

const PedidoCopia = require('../modelos/PedidoCopia')
pedidoCopias.use(cors())

pedidoCopias.post('/', (req, res) => {
	const dia = new Date()
	const datos = {
		cantidad: req.body.cantidad,
		subtotal: req.body.subtotal,
		venta_id: req.body.venta_id,
		tipocopia_id: req.body.tipocopia_id,
		created_at: dia
	}

	PedidoCopia.create(datos)
	.then(
		res.json({ message: 'Datos almacenados correctamente' })
	)
	.catch(err => {
		console.log(err)
	})
})

module.exports = pedidoCopias