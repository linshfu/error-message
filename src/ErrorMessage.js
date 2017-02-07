export default class ErrorMessage {
  constructor(error = {}) {
    this.error = error
    error.code = (typeof error.code === 'number')? error.code : '#'
    error.msg = (typeof error.msg === 'string')? error.msg : 'System Error'
  }

  static middleware = []

  static use(fn) {
    if (!fn || typeof fn !== 'function') {
      console.error('ErrorMessage.use() error: .use( function )')
      return
    }

    ErrorMessage.middleware.push(fn)
  }

  static parse(error) {
    return (typeof error === 'object')?  new ErrorMessage(error) :  new ErrorMessage()
  }

  executeMiddleware(middleware, data, next) {
    const composition = middleware.reduceRight((next, fn) => () => {
      this.error = data
      fn(this.error, next)
    }, next)
    composition(data)
  }

  getObject() {
    const data = this.error
    this.executeMiddleware(ErrorMessage.middleware, data, (error, next) => {})
    return data
  }
}
