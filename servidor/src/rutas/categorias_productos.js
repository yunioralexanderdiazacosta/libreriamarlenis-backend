const express = require('express')
const categoriasProductos = express.Router()
const cors = require('cors')

const CategoriaProducto = require('../modelos/CategoriaProducto')
categoriasProductos.use(cors())

categoriasProductos.get('/', (req, res ) => {
	CategoriaProducto.findAll()
	.then(listarCategorias => {
		res.json(listarCategorias)
	})
	.catch(err => {
		console.log(err)
	})
})

module.exports = categoriasProductos