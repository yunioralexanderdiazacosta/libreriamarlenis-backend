const express =require('express')
const proveedores = express.Router()
const cors = require('cors')

const Proveedor = require('../modelos/Proveedor')
proveedores.use(cors())

/**
****** OBTENER ULTIMO PROVEEDOR REGISTRADO
**/
proveedores.get('/ultimo-registro', (req, res) => {
	Proveedor.max('id')
	.then(ultimoProveedor => {
		res.json(ultimoProveedor)
	})
	.catch(err => {
		console.log(err)
	})
})

proveedores.get('/', (req, res) => {
	Proveedor.findAll()
	.then(listarProveedores => {
		res.json(listarProveedores)
	})
	.catch(err => {
		console.log(err)
	})
})

proveedores.get('/:id', (req, res) => {
	const id = req.params.id
	Proveedor.findOne({
		where: { id: id }
	})
	.then(proveedor => {
		res.json(proveedor)
	})
	.catch(err => {
		console.log(err)
	})
})

proveedores.put('/:id', (req, res) => {
	const id = req.params.id
	Proveedor.findOne({
		where: { id: id }
	})
	.then(proveedor => {
		proveedor.update(req.body)
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

proveedores.post('/', (req, res) => {
	const proveedor = {
		razon_social: req.body.razon_social,
		contacto: req.body.contacto,
		telefono: req.body.telefono,
		correo: req.body.correo,
		direccion: req.body.direccion,
		estatus: 1,
	}

	Proveedor.create(proveedor)
	.then(
		res.status(200).json({ message: 'Datos insetados correctamente' })
	)
	.catch(err => {
		res.send(err)
	})
})


/**
****** DESACTIVAR PROVEEDOR
**/
proveedores.put('/desactivar/:id', (req, res) => {
	const id = req.params.id
	Proveedor.findOne({
		where: { id: id }
	})
	.then(proveedorU => {
		const dato = { estatus: req.body.estatus }
		proveedorU.update(dato)
		.then(
			res.json({ message: 'Proveedor desactivado satisfactoriamente' })
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
****** REACTIVAR PROVEEDOR
**/
proveedores.put('/activar/:id', (req, res) => {
	const id = req.params.id
	Proveedor.findOne({
		where: { id: id }
	})
	.then(proveedorU => {
		const dato = { estatus: req.body.estatus }
		proveedorU.update(dato)
		.then(
			res.json({ message: 'Proveedor reactivado correctamente' })
		)
		.catch(err => {
			res.send(err)
		})
	})
	.catch(err => {
		res.send(err)
	})
})
module.exports = proveedores