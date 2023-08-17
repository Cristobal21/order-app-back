const { response } = require('express')
const { mongoose } = require('mongoose')
const Pedido = require('../models/OrderModel')
const Eliminado = require('../models/DeleteOrderModel')

const createEvent = async (req, res = response) => {
  try {
    const pedido = new Pedido(req.body)
    const pedidoGuardado = await Pedido.insertMany(pedido) // Método de mongo

    res.status(201).json({
      ok: true,
      msg: 'Pedido agregado',
      event: pedidoGuardado
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error interno en el servidor, hable al administrador'
    })
  }
}

const getEvent = async (req, res = response) => {
  const pedidos = await Pedido.find({ activo: true })// Método de mongo

  res.json({
    ok: true,
    msg: 'Obtener Pedidos en True',
    pedidos
  })
}

const getEventFalse = async (req, res = response) => {
  const pedidos = await Pedido.find({ activo: false })// Método de mongo

  res.json({
    ok: true,
    msg: 'Obtener Pedidos en False',
    pedidos
  })
}

const getEventById = async (req, res = response) => {
  const id = req.params.id
  const pedido = await Pedido.findById(id)
  // const pedido = await Pedido.findOne({ $or: [{ _id: id }] })

  res.json({
    ok: true,
    msg: 'Pedido con Id',
    pedido
  })
}

const updateEvent = async (req, res = response) => {
  const pedidoId = req.params.id
  // const idMongo = new ObjectId(pedidoId)
  const idMongo = new mongoose.Types.ObjectId(pedidoId)

  try {
    const pedido = await Pedido.findById(idMongo) // Método de mongo

    if (!pedido) {
      return res.status(404).json({
        ok: false,
        msg: 'El pedido que solicitado no existe con ese id'
      })
    }

    const nuevoPedido = {
      ...req.body
    }

    const pedidoActualizado = await Pedido.updateOne( // Método de mongo
      pedido,
      nuevoPedido
    )

    res.json({
      ok: true,
      msg: 'Pedido anterior',
      evento: pedidoActualizado
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error interno en el servidor, hable al administrador'
    })
  }
}

const deleteEvent = async (req, res = response) => {
  const pedidoId = req.params.id

  try {
    const pedido = await Pedido.findById(pedidoId)

    if (!pedido) {
      return res.status(404).json({
        ok: false,
        msg: 'El pedido que solicitado no existe con ese id'
      })
    }

    const newPedidoEliminado = await Eliminado.insertMany(pedido)
    const pedidoEliminado = await Pedido.deleteOne(pedido)

    res.json({
      ok: true,
      msg: 'Pedido eliminado',
      evento: pedidoEliminado,
      new: newPedidoEliminado
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error interno en el servidor, hable al administrador'
    })
  }
}

const deleteAllEvents = async (req, res = response) => {
  try {
    const pedidos = await Pedido.find({ activo: false })
    await Eliminado.insertMany(pedidos)
    await Pedido.deleteMany({ activo: false })

    res.json({
      ok: true,
      msg: 'Pedidos eliminados'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor'
    })
  }
}

module.exports = {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  deleteAllEvents,
  getEventFalse
}
