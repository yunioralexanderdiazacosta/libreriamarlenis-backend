const express = require('express')
const invArchivos = express.Router()
const cors = require('cors')
const fileUpload = require('express-fileupload')

const InvArchivo = require('../modelos/InvArchivo')
invArchivos.use(cors())
invArchivos.use(fileUpload())

invArchivos.post('/', (req, res) => {
let archivo = req.files.archivo
	archivo.mv('/home/fliadiaz/libreria/servidor/src/inv_archivos/'+archivo.name, 
	err => {
		if(err) 
		{ 
			return res.status(500).send(err)
		}

		let campo = { archivo: archivo.name }

		InvArchivo.create(campo)
		.then(datos => {
			res.status(200).json(datos.id)
		})
		.catch(err =>{
			 console.log(err)
		})
	}) 
})


module.exports = invArchivos