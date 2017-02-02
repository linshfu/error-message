export default class ErrorMessage {
  static middleware = []

  static use(fn) {
    if (!fn || typeof fn !== 'function') {
      return
    }

    this.middleware = this.middleware.concat(Array.isArray(fn) ? fn : [fn])
  }

  static parse(error) {
    return new ErrorMessage(error)
  }

  constructor(error = {}) {
    this.errorCode = error.code || '#'
    this.errorMessage = error.msg || 'System Error'
  }

  toString() {
    return `${this.errorMessage}[${this.errorCode}]`
  }

  code() {
    return this.errorCode
  }

  msg() {
    return ErrorMessage.middleware.reduce((error, fn) => fn(error), { code: this.errorCode, msg: this.errorMessage }).msg
  }
}
