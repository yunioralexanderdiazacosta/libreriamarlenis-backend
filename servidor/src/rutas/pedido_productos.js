const express = require('express')
const pedidoProductos = express.Router()
const cors = require('cors')

const PedidoProducto = require('../modelos/PedidoProducto')
pedidoProductos.use(cors())

pedidoProductos.post('/', (req, res) => {
	const dia = new Date()
	const datos = {
		cantidad: req.body.cantidad,
		subtotal: req.body.subtotal,
		producto_id: req.body.producto_id,
		venta_id: req.body.venta_id,
		created_at: dia
	}
	PedidoProducto.create(datos)
	.then(
		res.json({ message: 'Pedido insertado correctamente' })	
	)
	.catch(err => {
		console.log(err)
	})
})
module.exports = pedidoProductos 