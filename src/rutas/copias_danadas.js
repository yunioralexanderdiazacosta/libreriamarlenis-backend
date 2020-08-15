const express = require('express')
const copiasdanadas = express.Router()
const cors = require('cors')
const moment = require('moment')
const Sequelize = require('sequelize')
const op = Sequelize.Op

const CopiaDanada = require('../modelos/CopiaDanada')
const Venta = require('../modelos/Venta')
Venta.hasMany(CopiaDanada,  { foreignKey: 'venta_id'})
CopiaDanada.belongsTo(Venta, { foreignKey: 'venta_id'})
copiasdanadas.use(cors())

/**
***** OBTIENE LAS COPIAS DAÑADAS DE ACUERDO A LA FECHA DADA
**/
copiasdanadas.get('/total/:mes', (req, res) => {
	const fecha = new Date()
	const ano = fecha.getFullYear()
	const mes = req.params.mes

	CopiaDanada.findOne({
		include: [{
			model: Venta,
			where: { estatus: 1 }
		}],
		attributes: [
			[Sequelize.literal(`SUM(cantidad)`), 'cantidadCopias']
		],
		where: Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('copias_danadas.created_at')), '=', mes)
	})
	.then(totalCopias => {
		res.json(totalCopias)
	})
	.catch(err => {
		console.log(err)
	})
})


/**
***** OBTIENE lAS ULTIMAS COPIAS DAÑADAS
**/
copiasdanadas.get('/ultimas/:fecha', (req, res) => {
	const fecha = req.params.fecha

	CopiaDanada.findOne({
		include: [{
			model: Venta,
			where: { estatus: 1 },
			attributes: ['id']
		}],
		attributes: [
			[Sequelize.literal(`SUM(cantidad)`), 'cantidadCopias']
		],
		where: Sequelize.where(Sequelize.fn('date', Sequelize.col('created_at')), '=', fecha)
		
	})
	.then(copiasDanadas => {
		res.json(copiasDanadas)
	})
	.catch(err => {
		res.send(err)
	})
})

/**
***** OBTIENE lAS ULTIMAS COPIAS DAÑADAS DE ACUERDO A UN RANGO DE FECHAS DADO
**/
copiasdanadas.get('/:desde/:hasta', (req, res) => {
	var  desde = req.params.desde 
	var hasta = req.params.hasta
	var fecha_desde = moment(desde).format("YYYY-MM-DD 00:00:00")
	var fecha_hasta = moment(hasta).format("YYYY-MM-DD 23:59:59")

	CopiaDanada.findOne({
		include: [{
			model: Venta,
			where: { estatus: 1 },
			attributes: ['id']
		}],
		attributes: [
			[Sequelize.literal(`SUM(cantidad)`), 'cantidadCopias']
		],
		where: {
			created_at: {
				[op.gte]: fecha_desde,
				[op.lte]: fecha_hasta
			}
		}
	})
	.then(total => {
		res.json(total)
	})
	.catch(err => {
		res.send(err)
	})

})


/**
***** ALMACENA EL REGISTRO DE COPIAS DAÑADAS
**/
copiasdanadas.post('/', (req, res) => {
	const dia = new Date()
	const datos = {
		cantidad: req.body.cantidad,
		venta_id: req.body.venta_id,
		created_at: dia
	}

	CopiaDanada.create(datos)
	.then(
		res.json({ message: 'Datos almacenados correctamente' })
	)
	.catch(err => {
		console.log(err)
	})
})
module.exports = copiasdanadas