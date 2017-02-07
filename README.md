# error-message

## Usage

    import {use,parse} from 'error-message'

    use((error) => {
      error.msg = `${error.msg}[${error.code}]`
    })

    const m_error = { code: 10100, msg: 'test' }

    const m = parse(m_error).getObject()

    console.log(m.msg)

    "test[10100]"

---

## Other

    import {use,parse} from 'error-message'

    use((error,next) => {
      error.msg = `${error.msg}[${error.code}]`
      next()
    })

    use((error,next) => {
      error.msg += `!!!`
      next()
    })

    const m_error = { code: 10100, msg: 'test' }

    const m = parse(m_error).getObject()

    console.log(m.msg)

    "test[10100]!!!"
