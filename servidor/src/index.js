const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const expressJwt = require('express-jwt')
const config = require('./config')
const port = process.env.port || 3000

//configuración
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressJwt({ secret: config.SECRET_KEY }).unless({ path: [{ url: '/api/usuarios/login'}, { url: /^\/api\/usuarios\/obtener\/.*/ }, { url: /^\/api\/usuarios\/recuperar-clave\/.*/ }]}))

//rutas
app.use('/api/usuarios', require('./rutas/usuarios'))
app.use('/api/clientes', require('./rutas/clientes'))
app.use('/api/productos', require('./rutas/productos'))
app.use('/api/categoriasproductos', require('./rutas/categorias_productos'))
app.use('/api/tipocopias', require('./rutas/tipos_copias'))
app.use('/api/tipotranscripciones', require('./rutas/tipos_transcripciones'))
app.use('/api/inv_archivo', require('./rutas/inv_archivos'))
app.use('/api/pedidoproductos', require('./rutas/pedido_productos'))
app.use('/api/pedidocopias', require('./rutas/pedido_copias'))
app.use('/api/pedidotranscripciones', require('./rutas/pedido_transcripciones'))
app.use('/api/ventas', require('./rutas/ventas'))
app.use('/api/copiasdanadas', require('./rutas/copias_danadas'))
app.use('/api/proveedores', require('./rutas/proveedores'))
app.use('/api/compras', require('./rutas/compras'))
app.use('/api/impuesto', require('./rutas/impuesto'))

app.listen(port, () => {
	console.log('Servidor funcionado en el puerto: ' + port);
})