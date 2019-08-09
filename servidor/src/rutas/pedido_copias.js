const express = require('express')
const pedidoCopias = express.Router()
const cors = require('cors')
const moment = require('moment')
const Sequelize = require('sequelize')
const op = Sequelize.Op

const PedidoCopia = require('../modelos/PedidoCopia')
const TipoCopia = require('../modelos/TipoCopia')
const Venta = require('../modelos/Venta')
TipoCopia.hasMany(PedidoCopia,  { foreignKey: 'tipocopia_id'})
PedidoCopia.belongsTo(TipoCopia, { foreignKey: 'tipocopia_id'})
Venta.hasMany(PedidoCopia,  { foreignKey: 'venta_id'})
PedidoCopia.belongsTo(Venta, { foreignKey: 'venta_id'})

pedidoCopias.use(cors())

pedidoCopias.get('/efectuadas/:mes', (req, res) => {
	const fecha = new Date()
	const ano = fecha.getFullYear()
	const mes = req.params.mes

	PedidoCopia.findAll({
		include: [{
			model: Venta,
			attributes: ['id'],
			where: { estatus: 1 }
		}],
		where: [ 
			{},
			Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('pedidos_copias.created_at')), '=', mes),
			Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('pedidos_copias.created_at')), '=', ano)
		],
		attributes: ['cantidad', 'subtotal']
	})
	.then(fotocopiasEfectuadas => {
		res.json(fotocopiasEfectuadas)
	})
	.catch(err => {
		res.send(err)
	})
})

pedidoCopias.get('/categorias/:mes', (req, res) => {
	const fecha = new Date()
	const ano = fecha.getFullYear()
	const mes = req.params.mes

	PedidoCopia.findAll({
		include: [{
			model: TipoCopia,
			attributes: ['id', 'descripcion']
		},
		{
			model: Venta,
			attributes: ['id'],
			where: { estatus: 1 }
		}],
		attributes: [
			[Sequelize.literal(`SUM(cantidad)`), 'cantidadCopias']
		],
		where: [
			{},
			Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('pedidos_copias.created_at')), '=', mes),
			Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('pedidos_copias.created_at')), '=', ano)
		],
		group: ['tipocopia_id']
	})
	.then(listarCopias => {
		res.json(listarCopias)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
**** ULTIMAS FOTOCOPIAS REALIZADAS
**/
pedidoCopias.get('/ultimas', (req, res) => {
	const fecha = new Date()
	const ano = fecha.getFullYear()
	const mes = fecha.getMonth()+1
	const dia = fecha.getDate()
	const hoy = ano + "-" + mes + "-"+dia

	PedidoCopia.findAll({ 
		attributes: [
				[Sequelize.literal(`DATE(created_at)`), 'fecha'],
				[Sequelize.literal(`SUM(cantidad)`), 'cantidadCopias']
		],
		where: {
			created_at: {
				[op.lt]: hoy
			}
		},
		group: ['fecha'],
		order:  Sequelize.literal('fecha DESC'),
		limit: 5
	})
	.then(ultimasCopias => {
		res.json(ultimasCopias)
	})
	.catch(err => {
		console.log(err)
	})
})

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