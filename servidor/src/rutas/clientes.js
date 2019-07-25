const express = require('express')
const clientes = express.Router()
const cors = require('cors')

const Cliente = require('../modelos/Cliente')
clientes.use(cors())

/*
****** Obtener Clientes ******
*/
clientes.get('/', (req, res) => {
	Cliente.findAll()
	.then(listarClientes => {
		res.json(listarClientes)
	})
	.catch(err => {
		console.log(err)
	})
})

/*
****** Obtener Cliente ******
*/
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

/*
****** Guardar cliente ******
*/
clientes.post('/', (req, res) => {
	const dia = new Date()
	let datosCliente = {
		cedula: req.body.cedula,
		nombres: req.body.nombres,
		apellidos: req.body.apellidos,
		telefono: req.body.telefono,
		direccion: req.body.direccion,
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