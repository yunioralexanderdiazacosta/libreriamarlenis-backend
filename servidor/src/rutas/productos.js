const express = require("express")
const productos = express.Router()
const cors = require("cors")

const Producto = require('../modelos/Producto')
const CategoriaProducto = require('../modelos/CategoriaProducto')
CategoriaProducto.hasMany(Producto)
Producto.belongsTo(CategoriaProducto)
productos.use(cors())

/*
****** Obtener Productos ******
*/
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
		console.log(err)
	})
})

/*
****** Obtener Producto ******
*/
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
		console.log(err)
	})
})

/*
****** Restar cantidad en stock ******
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
				console.log(err)
			})
		})
		.catch(err => {
			console.log(err)
		})
})

/*
****** Aumentar cantidad en stock ******
*/
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
				console.log(err)
			})
		})
		.catch(err => {
			console.log(err)
		})
})
module.exports = productos