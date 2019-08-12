const express = require('express')
const usuarios = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')

const Usuario = require('../modelos/Usuario')
const Rol = require('../modelos/Rol')


/*
****** OBTENER USUARIOS ******
*/
usuarios.get('/', (req, res) => {
	Usuario.findAll()
	.then(listarUsuarios => {
		res.json(listarUsuarios)
	})
	.catch(err => {
		res.send(err)
	})
})

/*
****** OBTENER USUARIO ******
*/
usuarios.get('/estadistica/:id', (req, res) => {
	const id = req.params.id
	Usuario.findOne({
		where: {
			id: id
		}
	})
	.then(obtenerUsuario => {
		res.json(obtenerUsuario)
	})
	.catch(err => {
		res.send(err)
	})
})
/*
****** REGISTRO DE USUARIOS
*/
usuarios.post('/register', (req, res) => {
	const dia = new Date()
	const datosUsuario = {
		cedula: req.body.cedula,
		nombres: req.body.nombres,
		apellidos: req.body.apellidos,
		correo: req.body.correo,
		telefono: req.body.telefono,
		direccion: req.body.direccion,
		usuario: req.body.usuario,
		clave: req.body.clave,
		estatus: req.body.estatus,
		rol_id: req.body.rol_id,
		created_at: dia
	}

	Usuario.findOne({
		where: {
			usuario: req.body.usuario
		} 
	})
	.then(usuarioEncontrado => {
		if(!usuarioEncontrado)
		{
			const hash = bcrypt.hashSync(datosUsuario.clave, 10)
			datosUsuario.clave = hash
			Usuario.create(datosUsuario)
			.then(
				res.json({ message: 'Usuario registrado satisfactoriamente' })
			)
			.catch(err => {
				res.send('Error: ' + err)
			})
		}
		else
		{
			res.status(403).send('El nombre de usuario ya se encuentra registrado')
		}
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** LOGIN DE USUARIOS 
**/
usuarios.post('/login', (req, res) => {
	Usuario.findOne({
		where: {
			usuario: req.body.usuario
		}
	})
	.then(usuarioEncontrado => {
		if(!usuarioEncontrado)
		{
			res.status(403).send('Usuario y/o contraseña incorrectos')
		}
		else
		{
			if(bcrypt.compareSync(req.body.clave, usuarioEncontrado.clave))
			{
				let token = jwt.sign(usuarioEncontrado.dataValues, config.SECRET_KEY, 
				{
					expiresIn: 60*60*24
				})
				res.json({ token: token })
			}
			else{
				res.status(403).send('Usuario y/o contraseña incorrectos')
			}
		}
	})
	.catch(err => {
		res.send(err)
	})
})

/*
****** ACTUALIZAR USUARIO ******
*/
usuarios.put('/:id', (req, res) => {
	const id = req.params.id
	Usuario.findOne({
		where: { id: id } 
	})
	.then(obtenerUsuario => {
		obtenerUsuario.update(req.body)
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

/*
****** ACTUALIZAR CONTRASEÑA ******
*/
usuarios.put('/cambiar-clave', (req, res) => {
	Usuario.findOne({
		where: { id: req.user.id }
	})
	.then(usuarioE => {
		console.log(req.user.id)
		if(bcrypt.compareSync(req.body.claveActual, usuarioE.clave))
		{
			const hash = bcrypt.hashSync(req.body.clave, 10)
			req.body.clave = hash

			const dato = { clave: req.body.clave  }
			usuarioE.update(dato)
			.then(
				res.json({ message: 'Datos actualizados correctamente' })
			)
			.catch(err => {
				res.send(err)
			})
		}
		else
		{
			res.status(403).send('Contraseña incorrecta')
		}
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** DESACTIVAR USUARIO
**/
usuarios.put('/desactivar/:id', (req, res) => {
	const id = req.params.id
	Usuario.findOne({
		where: { id: id }
	})
	.then(usuario => {
		const dato = { estatus: req.body.estatus }
		usuario.update(dato)
		.then(
			res.json({ message: 'Empleado desactivado satisfactoriamente' })
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
****** REACTIVAR USUARIO
**/
usuarios.put('/activar/:id', (req, res) => {
	const id = req.params.id
	Usuario.findOne({
		where: { id: id }
	})
	.then(usuario => {
		const dato = { estatus: req.body.estatus }
		usuario.update(dato)
		.then(
			res.json({ message: 'Usuario reactivado correctamente' })
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
****** DATOS DEL USUARIO CONECTADO
**/
usuarios.get('/profile', (req, res) => {
	Usuario.findOne({
		where: {
			id: req.user.id
		}
	})
	.then(user => {
		if(user){
			res.status(200).json(user)
		}
		else
		{
			res.status(401).send('El usuario no existe')
		}
	})
	.catch(err => {
		res.send(err)
	})
})
module.exports = usuarios