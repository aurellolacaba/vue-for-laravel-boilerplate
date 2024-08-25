import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'

/**
 * Return message for HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Message of network operation
 */
function _getStatusMessage (status) {
  let message = ''
  switch (status) {
    case 200:
      message = 'All done. Request successfully executed'
      break
    case 201:
      message = 'Data successfully created'
      break
    case 400:
      message = 'Bad Request'
      break
    case 401:
      message = 'Unauthenticated'
      break
    case 404:
      message = 'Not found'
      break
    case 422:
      message = 'Unprocessable Entity'
      break
    case 503:
      message = 'Service unavailable. Try again later'
      break
    default:
      message = 'Something wrong. Client default error message'
      break
  }
  return message
}

function _getResponseErrorMessage (error) {
  if (error.response && error.response.data) return error.response.data.message
  if (error.response && error.response.statusText) return error.response.statusText
  return error.message === 'Network Error' ? 'Oops! Network Error. Try again later' : error.message
}

/**
 * Create instance, which represent response object
 * @param {Object} [data] - custom data
 * @param {Object} [response] - axios response object
 * @param {String} [message] - custom message to display
 */
export class ResponseWrapper {
  constructor (response, data = {}, message) {
    this.data = data
    this.success = response.data?.success ?? true
    this.status = response.status
    this.statusMessage = _getStatusMessage(this.status)
    this.message = message || response.data.message || null
  }
}

export class DataWrapper {
  constructor (data) {
    this.items = data.data,
    this.links = data.links,
    this.firstPageUrl = data.first_page_url,
    this.lastPageUrl = data.last_page_url,
    this.prevPageUrl = data.prev_page_url,
    this.nextPageUrl = data.next_page_url,
    this.from = data.from,
    this.to = data.to,
    this.currentPage = data.current_page,
    this.lastPage = data.last_page,
    this.total = data.total
  }
}

/**
 * Create instance, which represent error object
 * @param {Object} [error] - axios error object
 * @param {String} [message] - custom message to display
 */
export class ErrorWrapper {
  constructor (error, message) {
    this.success = error.response?.data?.success ? error.response.data.success: false
    this.code = error.code ? error.code : false
    this.status = error.response ? error.response.status : false
    this.statusMessage = _getStatusMessage(this.status)
    this.message = message || _getResponseErrorMessage(error)
    this.errors = error.response?.data?.errors ?? []
  }
}

/**
 * Uses to clear request data before send it
 * Client shouldn't change entity id
 * @param data
 * @return {{}}
 */
export function clearData (data) {
  const result = {}
  forEach(data, (item, propName) => {
    if (isArray(item) && item.length) {
      result[propName] = item
    }
    if (!isArray(item) && item && (propName !== 'id')) {
      result[propName] = item
    }
  })
  return result
}