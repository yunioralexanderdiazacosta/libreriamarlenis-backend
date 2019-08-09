const express = require('express')
const invArchivos = express.Router()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const fs = require('fs')

const InvArchivo = require('../modelos/InvArchivo')
invArchivos.use(cors())
invArchivos.use(fileUpload())

invArchivos.post('/', (req, res) => {

	let archivo = req.files.archivo
   	var hoy = new Date()
	var dia = hoy.getDate()
	var mes = hoy.getMonth()
	var ano = hoy.getFullYear()
	var hora = hoy.getHours()
	var minutos = hoy.getMinutes()
	var segundos = hoy.getSeconds() 
	var fecha = `${dia}${mes}${ano}${hora}${minutos}${segundos}`
	var path = '/home/fliadiaz/libreria/cliente/src/assets/inv_archivos/'
	var extension = archivo.name.split('.').pop();
    var nombre_archivo = fecha +"."+extension

	archivo.mv(path.concat(archivo.name), 
	err => {
		if(err) 
		{ 
			return res.status(500).send(err)
		}
	}) 
    fs.rename(path.concat(archivo.name), path.concat(nombre_archivo))
	let campo = { archivo: nombre_archivo }

	InvArchivo.create(campo)
	.then(datos => {
		res.status(200).json(datos.id)
	})
	.catch(err =>{
		 console.log(err)
	})
})

invArchivos.get('/:id', (req, res) => {
	const id = req.params.id

	InvArchivo.findOne({
		where: {
			id: id
		}
	})
	.then(datosArchivo => {
		res.json(datosArchivo)
	})
	.catch(err => {
		res.send(err)
	})
})
module.exports = invArchivos