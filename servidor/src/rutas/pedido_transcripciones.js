const express = require('express')
const pedidoTranscripciones = express.Router()
const cors = require('cors')
const Sequelize = require('sequelize')
const op = Sequelize.Op;
const fileUpload = require('express-fileupload')
const fs = require('fs')

const Transcripcion = require('../modelos/Transcripcion')
const TipoTranscripcion = require('../modelos/TipoTranscripcion')
const Venta = require('../modelos/Venta')
const Cliente = require('../modelos/Cliente')
const Usuario = require('../modelos/Usuario')

Venta.hasMany(Transcripcion)
Transcripcion.belongsTo(Venta)
TipoTranscripcion.hasMany(Transcripcion)
Transcripcion.belongsTo(TipoTranscripcion)
Usuario.hasMany(Transcripcion)
Transcripcion.belongsTo(Usuario)

pedidoTranscripciones.use(cors())
pedidoTranscripciones.use(fileUpload({ preserveExtension: true }))

/**
****** OBTENER UNA TRANSCRIPCIÓN
**/
pedidoTranscripciones.get('/:id', (req, res) => {
	const id = req.params.id

	Transcripcion.findOne({
		where: { id: id }
	})
	.then(obtenerTranscripcion => {
		res.json(obtenerTranscripcion)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** OBTENER TRANSCRIPCIONES ASOCIADAS A UNA VENTA DETERMINADA
**/
pedidoTranscripciones.get('/venta/:id', (req, res) => {
	const id = req.params.id

	Transcripcion.findAll({
		include: [{
			model: Usuario,
			attributes: ['usuario']
		}],
		where: { ventaId: id },
		attributes: ['fecha_entrega','titulo', 'monto']
	})
	.then(obtenerTareas => {
		res.json(obtenerTareas)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** OBTENER TRANSCRIPCIONES ASIGNADAS A UN USUARIO EN DETERMINADO MES
**/
pedidoTranscripciones.get('/user/:id/month/:mes', (req, res) => {
	const dia = new Date()
	var diaActual = dia.getDate()
	var mesActual = dia.getMonth()+1
	const ano = dia.getFullYear()
	const hoy = ano+"-"+mesActual+"-"+diaActual

	const id = req.params.id
	const mes = req.params.mes

	Transcripcion.findAll({
		where: [
			{ 
				usuarioId: id, 
				fecha_entrega: {
					[op.lt]: hoy
				}
			},
			Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), '=', ano),
			Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), '=', mes)
		],
		attributes: ['id', 'fecha_entrega', 'estatus_tarea', 'created_at', 'updated_at']
	})
	.then(transcripciones => {
		res.json(transcripciones)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** OBTENER TOTAL DE TRANSCRIPCIONES ASIGNADAS A UN USUARIO EN DETERMINADO MES
**/
pedidoTranscripciones.get('/usuario/:id/mes/:mes', (req, res) => {
	const dia = new Date()
	var diaActual = dia.getDate()
	var mesActual = dia.getMonth()+1
	const ano = dia.getFullYear()
	const hoy = ano+"-"+mesActual+"-"+diaActual

	const id = req.params.id
	const mes = req.params.mes
	Transcripcion.findOne({
		attributes: [
			[Sequelize.literal(`COUNT(id)`), 'totalTranscripcionesAsignadas']
		],
		where: [
			{ 
				usuarioId: id,
				fecha_entrega: {
					[op.lt]: hoy
				}
			 },
			Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), '=', ano),
			Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), '=', mes)
		]
	})
	.then(transcripcionesAsignadas => {
		res.json(transcripcionesAsignadas)
	}).catch(err => {
		console.log(err)
	})
})

/**
****** OBTENER TOTAL DE TRANSCRIPCIONES ASIGNADAS EN GENERAL EN UN DETERMINADO MES
**/
pedidoTranscripciones.get('/general/mes/:mes', (req, res) => {
	const dia = new Date()
	var diaActual = dia.getDate()
	var mesActual = dia.getMonth()+1
	const ano = dia.getFullYear()
	const hoy = ano+"-"+mesActual+"-"+diaActual

	const mes = req.params.mes

	Transcripcion.findOne({
		attributes: [ 
			[Sequelize.literal(`COUNT(id)`), 'totalTranscripcionesAsignadas']
		],
		where: [
		{ 
			fecha_entrega: {
				[op.lt]: hoy
			} 
		},
		Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), '=', ano),
		Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), '=', mes)
		]
	})
	.then(totalTranscripciones => {
		res.json(totalTranscripciones)
	})
	.catch(err => {
		console.log(err)
	})
})


/**
****** OBTENER TRANSCRIPCIONES
**/
pedidoTranscripciones.get('/', (req, res) => {
	Transcripcion.findAll({
		include: 
		[{
     		model: TipoTranscripcion,
     		attributes: ['descripcion']
     	},
		{ 
    		model: Usuario,
    		attributes: ['id', 'usuario']
     	}],
		attributes: ['id', 'titulo', 'estatus_tarea', 'estatus_entrega', 'created_at'],
		order: Sequelize.literal('created_at DESC')
	})
	.then(listarTranscripciones => {
		res.json(listarTranscripciones)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** GUARDAR PEDIDO DE TRANSCRIPCIÓN
**/
pedidoTranscripciones.post('/', (req, res) => {
	const dia = new Date()
	const  datos = {
		titulo: req.body.titulo,
		contenido: req.body.contenido,
		fecha_entrega: req.body.fechaEntrega,
		monto: req.body.monto,
		archivo_inv: req.body.archivo_inv,
		tiposTranscripcioneId: req.body.tipo_transcripcion,
		ventaId: req.body.venta_id,
		usuarioId: req.body.usuario_id,
		created_at: dia,
		updated_at: dia
	}
	Transcripcion.create(datos)
	.then(
		res.json({ message: 'Datos insertados correctamente' })
	)
	.catch(err => {
		console.log(err)
	})
}) 

/**
****** OBTENER LAS TRANSCRIPCIONES PENDIENTES DE UN USUARIO DETERMINADO
**/
pedidoTranscripciones.get('/pendientes/:id', (req, res) =>{
	const fecha = new Date()
	const ano = fecha.getFullYear()
	const mes = fecha.getMonth()+1
	const dia = fecha.getDate()
	const hoy = ano + "-" + mes + "-"+dia
	const id = req.params.id

	Transcripcion.findAll({
		include: 
		[{
     		model: TipoTranscripcion,
     		attributes: ['descripcion']
     	},
		{ 
    		model: Venta,
    		attributes: ['id', 'clienteId'],
    		include: {
     			model: Cliente,
     			attributes: ['cedula', 'nombres', 'apellidos']
     		}
     	}], 
		where: {
			usuarioId: id,
			fecha_entrega: {
				[op.gte]: hoy
			} 
		},
		attributes: ['id', 'fecha_entrega', 'titulo', 'estatus_tarea', 'estatus_entrega'],
		order: [ 
			['fecha_entrega', 'DESC'],
			['estatus_tarea', 'ASC']
		]
	}) 
	.then(listarPendientes => {
		res.json(listarPendientes)
	})
	.catch(err => {
		console.log(err)
	})
})

/**
****** OBTENER  TRANSCRIPCIONES PENDIENTE 
**/
pedidoTranscripciones.get('/pedido/:id', (req, res) => {
	const id = req.params.id

	Transcripcion.findOne({
	include: 
	[{ 
		model: Venta,
		attributes: ['id', 'clienteId'],
		include: {
 			model: Cliente,
 			attributes: ['cedula', 'nombres', 'apellidos']
 		}
 	}], 
	where: { id: id }
	})
	.then(transcripcion => {
		res.json(transcripcion)
	})
	.catch(err => {
		console.log(err)
	})
})


pedidoTranscripciones.put('/:id', (req,res) => {
	const id = req.params.id

	Transcripcion.findOne({
		where: { id: id }
	})
	.then(obtenerTarea => {
		obtenerTarea.update(req.body)
		.then(
			res.json({ message: 'Datos actulizados correctamente' })
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
****** ACTUALIZAR TRANSCRIPCION PENDIENTE 
**/
pedidoTranscripciones.put('/actualizar/:id', (req, res) => {
	const id = req.params.id

    Transcripcion.findOne({
    	where: {
    		id: id
    	}
    })
    .then(transcripcion => {
		const datos = {
			estatus_tarea: parseInt(req.body.estatus_tarea),
			archivo_tarea: '',
			estatus_entrega: parseInt(req.body.estatus_entrega),
			updated_at:  ''
		}

		if(datos.estatus_entrega == 1)
		{
			const date = new Date()
			datos.updated_at = date
		}

    	if(req.files)
    	{
    		var hoy = new Date()
			var dia = hoy.getDate()
			var mes = hoy.getMonth()
			var ano = hoy.getFullYear()
			var hora = hoy.getHours()
			var minutos = hoy.getMinutes()
			var segundos = hoy.getSeconds() 
			var fecha = `${dia}${mes}${ano}${hora}${minutos}${segundos}`
			var path = '/home/fliadiaz/libreria/cliente/src/assets/tarea_archivos/'
    		datos.archivo_tarea = req.files.archivo_tarea
    		var extension = datos.archivo_tarea.name.split('.').pop();
    		var nombre_archivo = fecha +"."+extension
    	}
    	else
    	{
    		datos.archivo_tarea =''
    	}

	    if(req.files)
	    {
	    	datos.archivo_tarea.mv(path.concat(datos.archivo_tarea.name), 
			err => {
				if(err) 
				{ 
					return res.status(500).send(err)
				}
	    	})
	    	fs.rename(path.concat(datos.archivo_tarea.name), path.concat(nombre_archivo))
	    	datos.archivo_tarea = nombre_archivo
	    }
	   	if(transcripcion.archivo_tarea != ''){ delete datos.archivo_tarea }

    	transcripcion.update(datos)
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
****** BUSCAR TRANSCRIPCIÓN POR TIPO Y PALABRA CLAVE
**/
pedidoTranscripciones.get('/buscar/:id/:palabra', (req, res) => {
	const id = req.params.id
	const palabra = req.params.palabra

	Transcripcion.findAll({
		where: {
			titulo: {
				[op.substring]: palabra
			},
			tiposTranscripcioneId: id,
			estatus_entrega: 1
		}
	})
	.then(transcripciones => {
		res.json(transcripciones)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
****** BUSCAR TRANSCRIPCIÓN 
**/
pedidoTranscripciones.get('/buscar/:palabra', (req, res) => {
	const palabra = req.params.palabra

	Transcripcion.findAll({
		where: {
			titulo: {
				[op.substring]: palabra
			},
			estatus_entrega: 1
		}
	})
	.then(transcripciones => {
		res.json(transcripciones)
	})
	.catch(err => {
		res.send(err)
	})
})

module.exports = pedidoTranscripciones