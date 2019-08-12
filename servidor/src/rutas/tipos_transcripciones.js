const express = require('express')
const tipoTranscripciones = express.Router()
const cors = require('cors')

const TipoTranscripcion = require('../modelos/TipoTranscripcion')
tipoTranscripciones.use(cors())

/**
**** OBTENER TIPO DE TAREAS
**/
tipoTranscripciones.get('/', (req, res) =>{
	TipoTranscripcion.findAll()
	.then(listarTipos => {
		res.json(listarTipos)
	})
	.catch( err => {
		console.log(err)
	})
})

/**
**** OBTENER TIPO DE TAREA
**/
tipoTranscripciones.get('/:id', (req, res) => {
	const id = req.params.id
	TipoTranscripcion.findOne({
		where: { id: id }
	})
	.then(obtenerTipo => {
		res.json(obtenerTipo)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
***** DESACTIVAR TIPO DE TAREA
**/
tipoTranscripciones.put('/desactivar/:id', (req, res) => {
	const id = req.params.id
	TipoTranscripcion.findOne({
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
***** REACTIVAR TIPO DE TAREA
**/
tipoTranscripciones.put('/reactivar/:id', (req, res) => {
	const id = req.params.id
	TipoTranscripcion.findOne({
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
**** ACTUALIZAR TIPO DE TAREA
**/
tipoTranscripciones.put('/:id', (req, res) => {
	const id = req.params.id
	TipoTranscripcion.findOne({
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
**** GUARDAR TIPO DE TAREA
**/
tipoTranscripciones.post('/', (req, res) => {
	TipoTranscripcion.create(req.body)
	.then(
		res.json({ message: 'Datos almacenados correctamente' })
	)
	.catch(err => {
		res.send(err)
	})
})

module.exports = tipoTranscripciones