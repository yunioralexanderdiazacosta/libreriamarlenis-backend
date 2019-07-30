const express = require('express')
const ventas = express.Router()
const cors = require('cors')
const moment = require('moment');
const Sequelize = require('sequelize')
const op = Sequelize.Op

const Venta = require('../modelos/Venta')
const Cliente = require('../modelos/Cliente')
Cliente.hasMany(Venta)
Venta.belongsTo(Cliente)

ventas.use(cors())
/**
****** BUSCAR VENTAS POR EL RANGO OBTENIDO 
**/
ventas.get('/:desde/:hasta', (req, res) => {
	var desde = req.params.desde 
	var hasta = req.params.hasta
	var fecha_desde = moment(desde).format("YYYY-MM-DD 00:00:00")
	var fecha_hasta = moment(hasta).format("YYYY-MM-DD 23:59:59")

	Venta.findAll({
		attributes: [
			[Sequelize.literal('DATE(created_at)'), 'fecha'],
        	[Sequelize.literal('COUNT(created_at)'), 'totalVentas'],
        	[Sequelize.literal('SUM(total)'), 'montoTotal']
		],
		group: ['fecha'],
		where: {
			estatus: 1,
			created_at: {
				[op.gte]: fecha_desde,
				[op.lte]: fecha_hasta
			}
		}
	})
	.then(ventas => {
		res.json(ventas)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** OBTENER VENTAS
**/
ventas.get('/', (req, res) => {
	Venta.findAll({ 
		include: 
		[{ 
    		model: Cliente,
    		attributes: ['cedula', 'nombres', 'apellidos']
     	}] 
  	})
	.then(listarVentas => {
		res.json(listarVentas)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** GUARDAR VENTA
**/
ventas.post('/', (req, res) => {
	let datos = {
		total: req.body.total,
		clienteId: req.body.cliente_id,
		usuario_id: req.body.usuario_id,
		estatus: req.body.estatus
	}
	Venta.create(datos)
	.then(venta => {
		res.json(venta.id)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** ANULAR VENTA
**/
ventas.put('/anular/:id', (req, res) => {
	const id = req.params.id
	Venta.findOne({
		where: { id: id }
	})
	.then(ventaU => {
		const dato = { estatus: req.body.estatus }
		ventaU.update(dato)
		.then(
			res.json({ message: 'Venta anulada satisfactoriamente' })
		)
		.catch(err => {
			res.send(err)
		})
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** REACTIVAR VENTA
**/
ventas.put('/reactivar/:id', (req, res) => {
	const id = req.params.id
	Venta.findOne({
		where: { id: id }
	})
	.then(ventaU => {
		const dato = { estatus: req.body.estatus }
		ventaU.update(dato)
		.then(
			res.json({ message: 'Venta reactivada correctamente' })
		)
		.catch(err => {
			res.send(err)
		})
	})
	.catch(err => {
		res.send(err)
	})
})

module.exports = ventas