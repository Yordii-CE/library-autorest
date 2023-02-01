const { pool } = require('../helpers/connection')
const { getTableFields } = require('../helpers/table')

const get = async (name, table, procedures = {}) => {
  let fields = await getTableFields(table)

  let results = { fields }

  if (procedures.get) {
    let response = await pool.query(`call ${procedures.get}`)
    results[name] = response[0]
  } else {
    let response = await pool.query(`select * from ${table}`)
    results[name] = response
  }

  return results
}

const getById = async (name, table, procedures = {}) => {
  let fields = await getTableFields(table)

  let results = { fields }
  let response
  let id = 35

  if (procedures.getById) {
    response = await pool.query(`call ${procedures.getById}(${id})`)
  } else {
    response = await pool.query(`select * from ${table} where id = ${id}`)
  }
  console.log(response) //Hacer pruebas con procedimiento
  response = response[0].length == 0 ? null : response[0]
  results[name] = response
  return results
}

const post = async () => {
  let fields = await getTableFields(table)
  let queryFields = formatFieldsForInsert(fields.map((el) => el.name))
  if (!compareValues(fields, req.body)) {
    res.json(`No se enviaron todos los campos: ${queryFields}`)
    return
  }
  let queryValues = formatValuesForInsert(fields, req.body)

  let sql = `insert into ${table} (${queryFields}) values (${queryValues})`
}
const put = async () => {}
const _delete = async () => {}
module.exports = {
  get,
  getById,
  post,
  put,
  _delete,
}
