const express = require('express')
const clientes = express.Router()
const cors = require('cors')
const Sequelize = require('sequelize')
const Cliente = require('../modelos/Cliente')
clientes.use(cors())

/**
****** OBTENER ULTIMO CLIENTE REGISTRADO
**/
clientes.get('/ultimo-registro', (req, res) => {
	Cliente.max('id')
	.then(listarClientes => {
		res.json(listarClientes)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** OBTENER CLIENTES
**/

clientes.get('/', (req, res) => {
	Cliente.findAll()
	.then(listarClientes => {
		res.json(listarClientes)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** OBTENER CLIENTE
**/
clientes.get('/:id', (req, res) => {
	const id = req.params.id
	Cliente.findOne({
		where: {
			id: id
		}
	})
	.then(mostrarCliente => {
		res.json(mostrarCliente)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** ACTUALIZAR CLIENTE
**/
clientes.put('/:id', (req, res) => {
	const id = req.params.id

	Cliente.findOne({
		where: { id: id }
	})
	.then(obtenerCliente => {
		obtenerCliente.update(req.body)
		.then(
			res.json({ message: 'Datos actualizados correctamente' })
		)
		.catch(err => {
			console.log(err)
		})
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** DESACTIVAR CLIENTE
**/
clientes.put('/desactivar/:id', (req, res) => {
	const id = req.params.id

	Cliente.findOne({
		where: { id: id }
	})
	.then(cliente => {
		const dato = { estatus: req.body.estatus }
		cliente.update(dato)
		.then(
			res.json({ message: 'Cliente desactivado satisfactoriamente' })
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
****** REACTIVAR ClIENTE
**/
clientes.put('/reactivar/:id', (req, res) => {
	const id = req.params.id

	Cliente.findOne({
		where: { id: id }
	})
	.then(cliente => {
		const dato = { estatus: req.body.estatus }
		cliente.update(dato)
		.then(
			res.json({ message: 'Cliente reactivado correctamente' })
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
****** GUARDAR CLIENTE
**/
clientes.post('/', (req, res) => {
	const dia = new Date()
	let datosCliente = {
		cedula: req.body.cedula,
		nombres: req.body.nombres,
		apellidos: req.body.apellidos,
		telefono: req.body.telefono,
		direccion: req.body.direccion,
		estatus: 1,
		created_at: dia
	}

	Cliente.findOne({
		where: {
			cedula: req.body.cedula
		}
	})
	.then(clienteEncontrado => {
		if(!clienteEncontrado)
		{
			Cliente.create(datosCliente)
			.then(
				res.json({ message: 'Cliente registrado satisfactoriamente' })
			)
			.catch(err => {
				res.send(err)
			})
		}
		else
		{
			res.estatus(403).send('El número de cédula ya se encuentra registrado')
		}
	})
	.catch(err => {
		res.send(err)
	})
}) 

module.exports = clientes