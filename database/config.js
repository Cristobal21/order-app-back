const mongoose = require('mongoose')

const dbConnection = () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DB_CNN1)
    console.log('DB online')
  } catch (error) {
    console.log(error)
    throw new Error('Error al inicializar la base de datos')
  }
}

module.exports = {
  dbConnection
}
