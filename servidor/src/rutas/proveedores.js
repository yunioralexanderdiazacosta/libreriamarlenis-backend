const express =require('express')
const proveedores = express.Router()
const cors = require('cors')

const Proveedor = require('../modelos/Proveedor')
proveedores.use(cors())

proveedores.get('/', (req, res) => {
	Proveedor.findAll()
	.then(listarProveedores => {
		res.json(listarProveedores)
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
module.exports = proveedores