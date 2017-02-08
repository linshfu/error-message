import {use, parse} from '../src/ErrorMessage.js'

if (module.hot) {
  module.hot.accept()
}

use(function (error) {
  error.msg = `${error.msg}[${error.code}]`
})

use(function (error) {
  return { code: error.code, msg: `${error.msg}[${error.code}]`}
})

const m_error = { code: 10100, msg: 'test'}

const m = parse(m_error).msg()

console.log(m)
