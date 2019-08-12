const express = require('express')
const categoriasProductos = express.Router()
const cors = require('cors')

const CategoriaProducto = require('../modelos/CategoriaProducto')
categoriasProductos.use(cors())

/**
***** OBTENER CATEGORIAS DE PRODUCTOS
**/
categoriasProductos.get('/', (req, res ) => {
	CategoriaProducto.findAll()
	.then(listarCategorias => {
		res.json(listarCategorias)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
***** OBTENER CATEGORIA DE PRODUCTO
**/
categoriasProductos.get('/:id', (req, res) => {
	const id = req.params.id

	CategoriaProducto.findOne({
		where: { id: id }
	})
	.then(obtenerCategoria => {
		res.json(obtenerCategoria)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
***** ACTUALIZAR CATEGORIA DE PRODUCTO
**/

categoriasProductos.put('/:id', (req, res) => {
	const id = req.params.id

	CategoriaProducto.findOne({
		where: { id: id }
	})
	.then(obtenerCategoria => {
		obtenerCategoria.update(req.body)
		.then(
			res.json({ message: 'Datos actualizados correctamente' })
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
***** DESACTIVAR CATEGORIA DE PRODUCTO
**/
categoriasProductos.put('/desactivar/:id', (req, res) => {
	const id = req.params.id

	CategoriaProducto.findOne({
		where: { id: id }
	})
	.then(tipo => {
		const dato = { estatus: req.body.estatus }
		tipo.update(dato)
		.then(
			res.json({ message: 'Datos actualizados correctamente' })
		)
		.catch(err => {
			res.send(err)
		})
	})
	.catch(err => {
		console.log(err)
	})
})

/**
***** REACTIVAR CATEGORIA DE PRODUCTO
**/
categoriasProductos.put('/reactivar/:id', (req, res) => {
	const id = req.params.id

	CategoriaProducto.findOne({
		where: { id: id }
	})
	.then(tipo => {
		const dato = { estatus: req.body.estatus }
		tipo.update(dato)
		.then(
			res.json({ message: 'Datos actualizados correctamente' })
		)
		.catch(err => {
			res.send(err)
		})
	})
	.catch(err => {
		console.log(err)
	})
})

/**
***** GUARDAR CATEGORIA DE PRODUCTO
**/
categoriasProductos.post('/', (req, res) => {
	CategoriaProducto.create(req.body)
	.then(
		res.json({ message: 'Datos insertados correctamente' })
	)
	.catch(err => {
		res.send(err)
	})
})

module.exports = categoriasProductos