export class ErrorMessage {
  static middleware = []

  static use(fn) {
    if (!fn || typeof fn !== 'function') {
      return
    }

    this.middleware = this.middleware.concat(Array.isArray(fn) ? fn : [fn])
  }

  constructor(error = {}) {
    this.errorCode = error.code || '#'
    this.errorMessage = error.msg || 'error'
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

ErrorMessage.use(function (error) {
  return { code: error.code, msg: `${error.msg}[${error.code}]`}
})

function parse(error) {
  return new ErrorMessage(error)
}

const m = parse({
  code: 10100,
  msg: 'test'
})

console.log(m.msg())
