const formatValuesForUpdate = (fields, body) => {
  let formatedForUpdate = ''
  for (const field of fields) {
    if (!body.hasOwnProperty(field.name)) continue
    let fieldName = field.name
    let fieldType = field.type
    if (['int', 'float'].includes(fieldType)) {
      formatedForUpdate += `${fieldName} = ${body[fieldName]}, `
    } else {
      formatedForUpdate += `${fieldName} = '${body[fieldName]}', `
    }
  }
  //trim last ', '
  formatedForUpdate = formatedForUpdate.substring(
    0,
    formatedForUpdate.length - 2
  )
  return formatedForUpdate
}
