const compareValues = (fields, body) => {
  for (const field of fields) {
    let fieldName = field.name
    if (!body.hasOwnProperty(fieldName)) return false
  }

  return true
}
