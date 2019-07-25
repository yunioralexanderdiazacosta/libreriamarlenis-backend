const express = require('express')
const compras = express.Router()
const cors = require('cors')

const Compra = require('../modelos/Compra')
const Proveedor = require('../modelos/Proveedor')
const PedidoCompra = require('../modelos/PedidoCompra')
Proveedor.hasMany(Compra)
Compra.belongsTo(Proveedor)

compras.use(cors())

compras.get('/', (req, res) => {
	Compra.findAll({ include: 
		[{ 
    		model: Proveedor,
    		attributes: ['razon_social']
     	}] 
  	})
	.then(listarCompras => {
		res.status(200).json(listarCompras)
	})
	.catch(err => {
		console.log(err)
	})
})

compras.post('/', (req, res) => {
	const datos = {
		total: req.body.total,
		proveedoreId: req.body.proveedor_id,
		estatus: 1
	}
	Compra.create(datos)
	.then(compra => {
		res.json(compra.id)
	})
	.catch(err => {
		console.log(err)
	})
})

compras.post('/pedidos', (req, res) => {
	const datos = {
		cantidad_compra: req.body.cantidad_compra,
		precio_compra: req.body.precio_compra,
		subtotal: req.body.subtotal,
		producto_id: req.body.producto_id,
		compra_id: req.body.compra_id
	}
	PedidoCompra.create(datos)
	.then(
		res.status(200).json({ message: 'Datos insertados correctamente' })
	)
	.catch(err => {
		console.log(err)
	})
})
module.exports = compras

