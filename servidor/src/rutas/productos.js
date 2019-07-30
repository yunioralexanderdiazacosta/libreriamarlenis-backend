const express = require("express")
const productos = express.Router()
const cors = require("cors")

const Producto = require('../modelos/Producto')
const CategoriaProducto = require('../modelos/CategoriaProducto')
CategoriaProducto.hasMany(Producto)
Producto.belongsTo(CategoriaProducto)
productos.use(cors())

/**
****** OBTENER PRODUCTOS
**/
productos.get('/', (req, res) => {
	Producto.findAll({ 
		include:
		[{
			model: CategoriaProducto
		}]
	})
	.then(listarProductos => {
		res.json(listarProductos)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** OBTENER PRODUCTO
**/
productos.get('/:id', (req, res) => {
	const id = req.params.id
	Producto.findOne({
		where: {
			id: id
		}
	})
	.then(mostrarProducto => {
		res.json(mostrarProducto)
	})
	.catch(err => {
		res.send(err)
	})
})

/*
****** RESTAR CANTIDAD EN STOCK ******
*/
productos.put('/inventario', (req, res) => {
	const id = req.body.producto_id
	Producto.findOne({
		where: { id: id }
	})
	.then(producto => {
		const dato = { stock: producto.stock - req.body.cantidad } 
		producto.update(dato)
		.then(
			res.json({message: 'Inventario actualizado correctamente'})
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
****** AUMENTAR CANTIDAD EN STOCK 
**/
productos.put('/aumentar-inventario', (req, res) => {
	const id = req.body.producto_id
	Producto.findOne({
			where: { id: id }
	})
	.then(producto => {
		const dato = { 
			stock: producto.stock + req.body.cantidad_compra,
			precio_venta: req.body.precio_venta
		 } 
		producto.update(dato)
		.then(
			res.status(200).json({message: 'Inventario actualizado correctamente'})
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
****** REGISTRAR PRODUCTO 
**/
productos.post('/', (req, res) => {
	const dia = new Date()
	let datos = {
		nombre: req.body.nombre,
		categoriasProductoId: req.body.categoriasProductoId,
		estado: 1,
		created_at: dia
	}
	Producto.create(datos)
	.then(
		res.json({ message: 'Datos almacenados correctamente' })
	)
	.catch(err => {
		res.send(err)
	})
})


module.exports = productos