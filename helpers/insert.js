const formatFieldsForInsert = (fields) => {
  let formatedForInsert = ''
  for (const value of fields) {
    formatedForInsert += value + ', '
  }
  formatedForInsert = formatedForInsert.substring(
    0,
    formatedForInsert.length - 2
  )
  return formatedForInsert
}

const formatValuesForInsert = (fields, body) => {
  let formatedForInsert = ''
  for (const field of fields) {
    let fieldName = field.name
    let fieldType = field.type
    if (['int', 'float'].includes(fieldType)) {
      formatedForInsert += `${body[fieldName]}, `
    } else {
      formatedForInsert += `'${body[fieldName]}', `
    }
  }
  formatedForInsert = formatedForInsert.substring(
    0,
    formatedForInsert.length - 2
  )
  return formatedForInsert
}
