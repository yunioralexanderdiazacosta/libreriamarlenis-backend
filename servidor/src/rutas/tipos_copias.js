const express = require('express')
const tipocopias = express.Router()
const cors = require('cors')

const TipoCopia = require('../modelos/TipoCopia')
tipocopias.use(cors())


/**
***** OBTENER TIPOS DE COPIAS
**/
tipocopias.get('/', (req, res ) => {
	TipoCopia.findAll()
	.then(listarTipos => {
		res.json(listarTipos)
	})
	.catch( err => {
		console.log(err)
	})
})

/**
***** OBTENER TIPO DE COPIA
**/
tipocopias.get('/:id', (req, res) => {
	const id = req.params.id
	TipoCopia.findOne({
		where: {
			id: id
		}
	})
	.then(mostrarTipo => {
		res.json(mostrarTipo)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
***** ACTUALIZAR TIPO DE COPIA
**/
tipocopias.put('/:id', (req, res) => {
	const id = req.params.id

	TipoCopia.findOne({
		where: { id: id }
	})
	.then(obtenerTipo => {
		obtenerTipo.update(req.body)
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
***** DESACTIVAR TIPO DE COPIA
**/
tipocopias.put('/desactivar/:id', (req, res) => {
	const id = req.params.id
	TipoCopia.findOne({
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
***** REACTIVAR TIPO DE COPIA
**/
tipocopias.put('/reactivar/:id', (req, res) => {
	const id = req.params.id
	TipoCopia.findOne({
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
***** GUARDAR TIPO DE COPIA
**/
tipocopias.post('/', (req, res) => {
	TipoCopia.create(req.body)
	.then(
		res.json({ message: 'Datos almacenados correctamente' })
	)
	.catch(err => {
		console.log(err)
	})
})

module.exports = tipocopias

