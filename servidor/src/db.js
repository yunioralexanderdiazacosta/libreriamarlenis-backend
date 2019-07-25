const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('marlenis', 'root', '1234', {
	host: 'localhost',
	dialect: 'mysql'
}) 

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize.authenticate()
.then(() => {
	console.log('Conectado')
})
.catch(err => {
	console.log('No conectado')
})
module.exports = db