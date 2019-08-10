const express = require('express')
const ventas = express.Router()
const cors = require('cors')
const moment = require('moment');
const Sequelize = require('sequelize')
const op = Sequelize.Op

const Venta = require('../modelos/Venta')
const Cliente = require('../modelos/Cliente')
const Usuario = require('../modelos/Usuario')
const PedidoCopia = require('../modelos/PedidoCopia')
Cliente.hasMany(Venta)
Venta.belongsTo(Cliente)
Usuario.hasMany(Venta, { foreignKey: 'usuario_id'})
Venta.belongsTo(Usuario, { foreignKey: 'usuario_id'})


ventas.use(cors())

/**
**** OBTENER VENTAS REALIZADAS A UN CLIENTE DETERMINADO
**/
ventas.get('/cliente/:id', (req, res) => {
	const id = req.params.id
	
	Venta.findAll({
		where: { clienteId: id },
		order: Sequelize.literal('created_at DESC')	
	})
	.then(ventasRealizadas => {
		res.json(ventasRealizadas)
	})
	.catch(err => {
		res.send(err)
	})
})


/**
**** OBTENER VENTAS EFECTUADAS POR UN USUARIO EN UN MES DETERMINADO
**/
ventas.get('/usuario/:id/mes/:mes', (req, res) => {
	const dia = new Date()
	const ano = dia.getFullYear()
	const id = req.params.id
	const mes = req.params.mes

	Venta.findOne({
		attributes: [
			[Sequelize.literal(`COUNT(id)`), 'totalVentas']
		],
		where: [
			{ usuario_id: id },
			Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), '=', ano),
			Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), '=', mes)
		]
	})
	.then(ventasRealizadas => {
		res.json(ventasRealizadas)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
**** OBTENER TOTAL DE VENTAS EFECTUADAS EN UN MES DETERMINADO
**/
ventas.get('/general/mes/:mes', (req, res) => {
	const dia = new Date()
	const ano = dia.getFullYear()
	const mes = req.params.mes

	Venta.findOne({
		attributes: [
			[Sequelize.literal(`COUNT(id)`), 'totalVentas']
		],
		where: [
			{},
			Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), '=', ano),
			Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), '=', mes)
		]
	})
	.then(totalVentasRealizadas => {
		res.json(totalVentasRealizadas)
	})
	.catch(err => {
		res.send(err)
	})

})

/**
****** OBTENER VENTAS DE LOS ULTIMOS MESES
**/
ventas.get('/mes', (req, res) => {
	const hoy = new Date()
	const ano = hoy.getFullYear()	

	Venta.findAll({
		attributes: [
			[Sequelize.literal(`ELT(MONTH(created_at), "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")`), 'mes'],
			[Sequelize.literal(`SUM(total)`), 'totalVenta']
		],
		where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), '=', ano),
		group: ['mes']
	})
	.then(ventasMes => {
		res.json(ventasMes)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** OBTENER CLIENTES ATENDIDOS POR MES
**/
ventas.get('/clientes-atendidos', (req, res) => {
	const hoy = new Date()
	const ano = hoy.getFullYear()

	Venta.findAll({
		attributes: [
			[Sequelize.literal(`ELT(MONTH(created_at), "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")`), 'mes'],
			[Sequelize.literal(`COUNT(DISTINCT(clienteId))`), 'totalClientes']
		],
		where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), '=', ano),
		group: ['mes']
	})
	.then(clientesMes => {
		res.json(clientesMes)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** OBTENER TOP DE CLIENTES FRECUENTES
**/
ventas.get('/clientes-frecuentes', (req, res) => {
	const hoy = new Date()
	const ano = hoy.getFullYear()

	Venta.findAll({
		include: 
		[{ 
    		model: Cliente,
    		attributes: ['cedula', 'nombres', 'apellidos']
     	}],
     	attributes: [
     		[Sequelize.literal(`COUNT(clienteId)`), 'totalAtencion']
     	],
     	where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('ventas.created_at')), '=', ano),
     	group: ['clienteId'],
     	order: Sequelize.literal('totalAtencion DESC'),
     	limit: 5
	})
	.then(topClientes => {
		res.json(topClientes)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** OBTENER SUMA TOTAL DE LAS ULTIMAS VENTAS
**/
ventas.get('/ultimas', (req, res) => {
	const fecha = new Date()
	const ano = fecha.getFullYear()
	const mes = fecha.getMonth()+1
	const dia = fecha.getDate()
	const hoy = ano + "-" + mes + "-"+dia

	Venta.findAll({
		attributes: [
			[Sequelize.literal(`DATE(created_at)`), 'fecha'],
			[Sequelize.literal(`SUM(total)`), 'totalVenta']
		],
		where: { 
			created_at: {
				[op.lt]: hoy
			},
			estatus: 1
		},
		group: ['fecha'],
		order:  Sequelize.literal('fecha DESC'),
		limit: 5
	})
	.then(ultimasVentas => {
		res.json(ultimasVentas)
	})
	.catch(err => {
		res.send(err)
	})
})

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
***** OBTENER VENTA
**/
ventas.get('/:id', (req, res) => {
	const id = req.params.id

	Venta.findOne({
		include: [{
			model: Cliente,
			attributes: ['cedula', 'nombres', 'apellidos']
		},
		{
			model: Usuario,
			attributes: ['usuario']
		}],
		where: { id: id },
		attributes: ['id', 'total', 'created_at']
	})
	.then(obtenerVenta => {
		res.json(obtenerVenta)
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
     	}],
     	order: Sequelize.literal('created_at DESC')	 
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