const { Schema, model } = require('mongoose')

const OrderSchema = Schema({
  activo: {
    type: Boolean,
    default: true
  },
  producto: {
    type: String,
    require: true
  },
  nombre: {
    type: String,
    require: true
  },
  direccion: {
    type: String,
    require: true
  },
  sector: {
    type: String
  },
  referencia: {
    type: String,
    require: true
  },
  numero: {
    type: Number,
    require: true
  },
  estadoPago: {
    type: String
  },
  medioPago: {
    type: String
  },
  precio: {
    type: String
  },
  fecha: {
    type: String,
    default: function () {
      const date = new Date(Date.now())
      const options = {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
      return date.toLocaleString('es-CL', options)
    }
  }
})

module.exports = model('Pedido', OrderSchema)
