const express = require('express')
const router = express.Router()
const jwt = require('../helpers/jwt')
const { JsonWebTokenError } = require('jsonwebtoken')
const {
  successResponse,
  errorResponse,
  failResponse,
} = require('../helpers/httpResponse')

const Model = require('../model')

const get = (name, table, procedures) => async (req, res) => {
  try {
    /* const auth = jwt.verify(req.token) */

    const response = await Model.get(name, table, procedures)
    res.json(successResponse(response))
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.json(failResponse(`Token invalido al obtener ${name}`))
      return
    }
    res.json(errorResponse(`Al obtener ${name}` + error))
  }
}

const getById = (name, table, procedures) => async (req, res) => {
  try {
    const response = await Model.getById(name, table, procedures)
    res.json(successResponse(response))
  } catch (error) {
    res.json(
      errorResponse(
        `Al obtener ${table.toLowerCase()} con id ${req.params.id}: ` + error
      )
    )
  }
}
const post = async (req, res) => {
  try {
    const auth = jwt.verify(req.token)

    const response = await pool.query(sql)
    if (response.affectedRows != 0) {
      res.json(successResponse())
    } else {
      res.json(failResponse(`No se pudo crear ${name}`))
    }
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.json(failResponse(`Token invalido al crear ${name}`))
      return
    }
    res.json(errorResponse(`Al crear ${name}` + error))
  }
}
const put = async (req, res) => {
  try {
    const auth = jwt.verify(req.token)
    let fields = await getTableFields(table).filter((el) => el.name != 'id')
    let queryValues = formatValuesForUpdate(fields, req.body)
    let sql = `update ${table} set ${queryValues} where id = ${req.params.id}`

    const response = await pool.query(sql)
    if (response.affectedRows != 0) {
      res.json(successResponse())
    } else {
      res.json(failResponse(`No se pudo actualizar un ${name}`))
    }
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.json(failResponse(`Token invalido al actualizar un ${name}`))
      return
    }
    res.json(errorResponse(`Al actualizar un ${name}` + error))
  }
}

const _delete = async (req, res) => {
  try {
    const auth = jwt.verify(req.token)

    const response = await pool.query(
      `delete from ${table} where id = ${req.params.id}`
    )

    if (response.affectedRows != 0) {
      res.json(successResponse())
    } else {
      res.json(failResponse(`No se pudo eliminar un ${name}`))
    }
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.json(failResponse(`Token invalido al eliminar un ${name}`))
      return
    }
    res.json(errorResponse(`Al eliminar ${name}` + error))
  }
}
module.exports = {
  get,
  getById,
  post,
  put,
  _delete,
}
