export default class ErrorMessage {
  constructor(error = {}) {
    this.error = {
      code: (typeof error.code === 'number')? error.code : '#',
      msg: (typeof error.msg === 'string')? error.msg : 'System Error'
    }
  }

  static middleware = []

  static use(fn) {
    if (!fn || typeof fn !== 'function') {
      return
    }

    ErrorMessage.middleware = ErrorMessage.middleware.concat(Array.isArray(fn) ? fn : [fn])
  }

  static parse(error) {
    return (typeof error === 'object')?  new ErrorMessage(error) :  new ErrorMessage()
  }

  toString() {
    return `${this.error.msg}[${this.error.code}]`
  }

  code() {
    return this.error.code
  }

  msg() {
    return ErrorMessage.middleware.reduce((error, fn) => (typeof fn(error) === 'object') ? fn(error) : error,this.error).msg
  }
}
