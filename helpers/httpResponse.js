const successResponse = (data) => {
  let response = {
    status: 'success',
    data,
  }
  return response
}
const failResponse = (message, details) => {
  let response = {
    status: 'fail',
    data: {
      message,
      details,
    },
  }
  return response
}
const errorResponse = (statusText) => {
  let response = {
    error: true,
    statusText: 'Error de servidor: ' + statusText,
  }
  return response
}

module.exports = { successResponse, failResponse, errorResponse }
