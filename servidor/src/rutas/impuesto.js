const express = require('express')
const impuesto = express.Router()
const cors = require('cors')

const Iva = require('../modelos/Iva')
impuesto.use(cors())

impuesto.get('/', (req, res) =>{
	Iva.findOne()
	.then(dato => {
		res.json(dato)
	})
	.catch(err => {
		res.send(err)
	})
})

impuesto.put('/', (req, res) => {
	Iva.findOne({
		where: { id: 1 }
	})
	.then(dato => {
		dato.update(req.body)
		.then(
			res.json({ message: 'Dato actualizados correctamente' })
		)
		.catch(err => {
			res.send(err)
		})
	})
	.catch(err => {
		res.send(err)
	})
})

module.exports = impuesto