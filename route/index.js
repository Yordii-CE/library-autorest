const express = require('express')
const auth = require('../middlewares/auth')

const { get, getById, post, put, _delete } = require('../controller')

const createEndpoint = (name, table, procedures) => {
  const router = express.Router()

  router.get(`/${name}`, auth, get(name, table, procedures))
  router.get(`/${name}/:id`, auth, getById(name, table, procedures))
  router.post(`/${name}`, auth, post)
  router.put(`/${name}/:id`, auth, put)
  router.delete(`/${name}/:id`, auth, _delete)

  return router
}

module.exports = { createEndpoint }
