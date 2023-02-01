const { pool } = require('../helpers/connection')
const getTableFields = async (table) => {
  let results = await pool.query(`SHOW COLUMNS FROM ${table}`)

  let fields = results.map((el) => ({ name: el.Field, type: el.Type }))

  return fields
}

module.exports = {
  getTableFields,
}
