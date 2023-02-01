const mysql = require('mysql')
require('dotenv').config({ path: `.env.development` })

const util = require('util')

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  insecureAuth: true,
  multipleStatements: true,
}

const pool = mysql.createPool(config)

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('DATABASE CONNECTION WAS CLOSED')
    }

    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.log('DATABASE HAS TO MANY CONNECTIONS')
    }

    if (err.code === 'ECONNREFUSED') {
      console.log('DATABASE CONNECTION WAS REFUSED')
    }
  }

  if (connection) connection.release()

  console.log('CAR SHOP DB is connected')

  return
})

pool.query = util.promisify(pool.query)
const getConnection = () => {
  return util.promisify(pool.getConnection).call(pool)
}

const beginTransaction = (connection) => {
  return util.promisify(connection.beginTransaction).call(connection)
}

const rollback = (connection) => {
  console.log('\n\nEjecutando Rollback...\n\n')
  return util.promisify(connection.rollback).call(connection)
}

const commit = (connection) => {
  return util.promisify(connection.commit).call(connection)
}

module.exports = {
  pool,
  getConnection: getConnection,
  beginTransaction: beginTransaction,
  rollback: rollback,
  commit: commit,
}
