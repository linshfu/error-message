export default class ErrorMessage {
  constructor(error = {}) {
    this.errorCode = error.code || '#'
    this.errorMessage = error.msg || 'System Error'
  }

  static middleware = []

  static use(fn) {
    if (!fn || typeof fn !== 'function') {
      console.error('ErrorMessage.use() error: .use( function )')
      return
    }

    this.middleware = this.middleware.concat(Array.isArray(fn) ? fn : [fn])
  }
  static parse(error) {
    let boolean = false
    if (typeof error === 'object') {
      if (typeof error.code === 'number') {
        if (typeof error.msg === 'string') {
          boolean = true
        } else {
          console.error('ErrorMessage.parse(error) typeof error: error.msg !== \'string\'')
        }
      } else {
        console.error('ErrorMessage.parse(error) typeof error: error.code !== \'number\'')
      }
    } else {
      console.error('ErrorMessage.parse(error) typeof error: error !== \'object\'')
    }
    return (boolean)? new ErrorMessage(error): new ErrorMessage()

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
