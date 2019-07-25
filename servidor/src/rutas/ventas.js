const express = require('express')
const ventas = express.Router()
const cors = require('cors')

const Venta = require('../modelos/Venta')
const Cliente = require('../modelos/Cliente')
Cliente.hasMany(Venta)
Venta.belongsTo(Cliente)

ventas.use(cors())
/*
****** Obtener ventas ******
*/
ventas.get('/', (req, res) => {
	Venta.findAll({ 
		include: 
		[{ 
    		model: Cliente,
    		attributes: ['cedula', 'nombres', 'apellidos']
     	}] 
  	})
	.then(listarVentas => {
		res.json(listarVentas)
	})
	.catch(err => {
		console.log(err)
	})
})

/*
****** Guardar venta ******
*/
ventas.post('/', (req, res) => {
	let datos = {
		total: req.body.total,
		clienteId: req.body.cliente_id,
		usuario_id: req.body.usuario_id,
		estatus: req.body.estatus
	}
	Venta.create(datos)
	.then(venta => {
		res.json(venta.id)
	})
	.catch(err => {
		console.log(err)
	})
})
module.exports = ventas