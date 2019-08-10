const express = require('express')
const pedidoProductos = express.Router()
const cors = require('cors')
const Sequelize = require('sequelize')

const Producto = require('../modelos/Producto')
const PedidoProducto = require('../modelos/PedidoProducto')
const CategoriaProducto = require('../modelos/CategoriaProducto')
Producto.hasMany(PedidoProducto, { foreignKey: 'producto_id'})
PedidoProducto.belongsTo(Producto, { foreignKey: 'producto_id'})
pedidoProductos.use(cors())

pedidoProductos.get('/venta/:id', (req, res) => {
	const id = req.params.id
	PedidoProducto.findAll({
		include: [{
			model: Producto,
			attributes: ['nombre']
		}],
		where:  { venta_id: id } 
	})
	.then(obtenerProductos => {
		res.json(obtenerProductos)
	})
	.catch(err => {
		console.log(err)
	})
})

pedidoProductos.get('/mes', (req, res) => {
	const dia = new Date()
	const ano = dia.getFullYear()

	PedidoProducto.findAll({
		attributes: [
			[Sequelize.literal(`ELT(MONTH(created_at), "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")`), 'mes'],
			[Sequelize.literal(`SUM(cantidad)`), 'totalProductos']
		],
		where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), '=', ano),
		group: ['mes']
	})
	.then(pedidoProductosMes => {
		res.json(pedidoProductosMes)
	})
	.catch(err => {
		console.log(err)
	})
})

pedidoProductos.get('/mas-vendidos', (req, res ) => {
	const dia = new Date()
	const ano = dia.getFullYear()

	PedidoProducto.findAll({
		include: [{
			model: Producto,
			attributes: ['nombre']
		}],
		attributes: [
			[Sequelize.literal(`SUM(cantidad)`), 'cantidadProductos']
		],
		where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('pedidos_productos.created_at')), '=', ano),
		group: ['producto_id'],
		order: Sequelize.literal('cantidadProductos DESC'),
		limit: 5
	})
	.then(productosMasVendidos => {
		res.json(productosMasVendidos)
	})
	.catch(err => {
		res.send(err)
	})
})

pedidoProductos.get('/categorias-mas-vendidas', (req, res) => {
	const dia = new Date()
	const ano = dia.getFullYear()

	PedidoProducto.findAll({
		include: [{
			model: Producto,
			attributes: ['id'],
			include: [{
				model: CategoriaProducto,
				group: ['id'],
				attributes: ['nombre']
			}]
		}],
		attributes: [
			[Sequelize.literal(`SUM(cantidad)`), 'cantidadProductos']
		],
		where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('pedidos_productos.created_at')), '=', ano),
		order: Sequelize.literal('cantidadProductos DESC'),
		limit: 5
	})
	.then(categoriasMasVendidos => {
		res.json(categoriasMasVendidos)
	})
	.catch(err => {
		res.send(err)
	})
})


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