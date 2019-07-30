const express = require('express')
const pedidoCopias = express.Router()
const cors = require('cors')
const moment = require('moment')
const Sequelize = require('sequelize')
const op = Sequelize.Op

const PedidoCopia = require('../modelos/PedidoCopia')
const TipoCopia = require('../modelos/TipoCopia')
TipoCopia.hasMany(PedidoCopia,  { foreignKey: 'tipocopia_id'})
PedidoCopia.belongsTo(TipoCopia, { foreignKey: 'tipocopia_id'})

pedidoCopias.use(cors())

/**
**** BUSCAR COPIAS POR RANGO DE FECHAS
**/
pedidoCopias.get('/:desde/:hasta', (req, res ) => {
	var  desde = req.params.desde 
	var hasta = req.params.hasta
	var fecha_desde = moment(desde).format("YYYY-MM-DD 00:00:00")
	var fecha_hasta = moment(hasta).format("YYYY-MM-DD 23:59:59")
	PedidoCopia.findAll({
		attributes: [ 
			[Sequelize.literal('SUM(cantidad)'), 'cantidadCopias'],
			[Sequelize.literal('SUM(subtotal)'), 'montoCopias']
		],
		include: [{
			model: TipoCopia, 
			attributes: ['descripcion', 'precio']
		}],
		group: ['tipocopia_id'],
		where: {
			created_at: {
				[op.gte]: fecha_desde,
				[op.lte]: fecha_hasta
			}
		}
	})
	.then(copias => {
		res.json(copias)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
**** ALMACENAR PEDIDO DE COPIA
**/
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