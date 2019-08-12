const express = require('express')
const compras = express.Router()
const cors = require('cors')
const moment = require('moment');
const Sequelize = require('sequelize')
const op = Sequelize.Op

const Compra = require('../modelos/Compra')
const Proveedor = require('../modelos/Proveedor')
const PedidoCompra = require('../modelos/PedidoCompra')
const Producto = require('../modelos/Producto')
Proveedor.hasMany(Compra)
Compra.belongsTo(Proveedor)
Compra.hasMany(PedidoCompra)
PedidoCompra.belongsTo(Compra)
Producto.hasMany(PedidoCompra, { foreignKey: 'producto_id'})
PedidoCompra.belongsTo(Producto, {foreignKey: 'producto_id' })
 
compras.use(cors())

/**
****** OBTENER INGRESOS DE UN PRODUCTO DETERMINADO 
**/
compras.get('/ingresos/producto/:id', (req, res) => {
	const id = req.params.id

	PedidoCompra.findAll({
		include:
		[{
			model: Compra,
			attributes: ['id'],
			where: { estatus: 1 }
		}],
		where: { producto_id: id },
		order: Sequelize.literal('created_at DESC')
	})
	.then(obtenerIngresos => {
		res.json(obtenerIngresos)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** OBTENER DETALLES DE UNA COMPRA
**/
compras.get('/detalles/compra/:id', (req, res) => {
	const id = req.params.id

	PedidoCompra.findAll({
		include: [{
			model: Producto,
			attributes: ['nombre']
		}],
		where: { compraId: id }
	})
	.then(obtenerProductos => {
		res.json(obtenerProductos)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** OBTENER COMPRA
**/
compras.get('/detalles/:id', (req, res) => {
	const id = req.params.id

	Compra.findOne({
		include: [{
			model: Proveedor,
			attributes: ['razon_social']
		}],
		where: {
			id: id
		}
	})
	.then(obtenerCompras => {
		res.json(obtenerCompras)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** OBTENER COMPRAS DE LOS ULTIMOS MESES
**/
compras.get('/mes', (req, res) => {
	const hoy = new Date()
	const ano = hoy.getFullYear()
	Compra.findAll({
		attributes: [
			[Sequelize.literal(`ELT(MONTH(created_at), "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")`), 'mes'],
			[Sequelize.literal(`SUM(total)`), 'totalCompra']
		],
		where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), '=', ano),
		group: ['mes']
	})
	.then(comprasMes => {
		res.json(comprasMes)
	})
	.catch(err => {
		res.send(err)
	})
})


/**
****** BUSCAR COMPRAS POR RANGO DE FECHAS
**/
compras.get('/:desde/:hasta', (req, res) => {
	var desde = req.params.desde
	var hasta = req.params.hasta
	var fecha_desde = moment(desde).format("YYYY-MM-DD 00:00:00")
	var fecha_hasta = moment(hasta).format("YYYY-MM-DD 23:59:59")
	Compra.findAll({
		include:
		[{ 
    		model: Proveedor,
    		attributes: ['razon_social']
     	},
     	{
     		model: PedidoCompra,
     		attributes: ['id']
     	}],
		where: {
			created_at: {
				[op.gte]: fecha_desde,
				[op.lte]: fecha_hasta
			}
		}
	})
	.then(compras => {
		res.json(compras)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** OBTENER COMPRAS
**/
compras.get('/', (req, res) => {
	Compra.findAll({ include: 
		[{ 
    		model: Proveedor,
    		attributes: ['razon_social']
     	}],
     	attributes: ['id', 'total', 'estatus', 'created_at'] 
  	})
	.then(listarCompras => {
		res.status(200).json(listarCompras)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** GUARDAR DATOS GENERALES DE LA COMPRA
**/
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

/**
****** GUARDAR DATOS ESPECIFICOS DE LA COMPRA
**/
compras.post('/pedidos', (req, res) => {
	const datos = {
		cantidad_compra: req.body.cantidad_compra,
		precio_compra: req.body.precio_compra,
		subtotal: req.body.subtotal,
		producto_id: req.body.producto_id,
		compraId: req.body.compra_id
	}
	PedidoCompra.create(datos)
	.then(
		res.status(200).json({ message: 'Datos insertados correctamente' })
	)
	.catch(err => {
		console.log(err)
	})
})

/**
****** ANULAR COMPRA
**/
compras.put('/anular/:id', (req, res) => {
	const id = req.params.id
	Compra.findOne({
		where: { id: id }
	})
	.then(compraU => {
		const dato = { estatus: req.body.estatus }
		compraU.update(dato)
		.then(
			res.json({ message: 'Compra anulada satisfactoriamente' })
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
****** REACTIVAR COMPRA
**/
compras.put('/reactivar/:id', (req, res) => {
	const id = req.params.id
	Compra.findOne({
		where: { id: id }
	})
	.then(compraU => {
		const dato = { estatus: req.body.estatus }
		compraU.update(dato)
		.then(
			res.json({ message: 'Compra reactivada correctamente' })
		)
		.catch(err => {
			res.send(err)
		})
	})
	.catch(err => {
		res.send(err)
	})
})
module.exports = compras

