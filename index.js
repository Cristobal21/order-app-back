const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')
require('dotenv').config()

//* * Crear el servido de express */
const app = express()

//* *Base de datos */
dbConnection()

//* * CORS */
app.use(cors())

//* * Directorio público */
app.use(express.static('public'))

//* * Lectura del body */
app.use(express.json())

//* * Rutas */
app.use('/api/admin', require('./routes/orders'))
app.use('/api/adminSent', require('./routes/orders'))

//* * Escuchar peticiones */
app.listen(process.env.PORT, () => {
  console.log(`Servido corriendo en el puerto: ${process.env.PORT}`)
})
