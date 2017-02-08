# error-message

## Usage

    import { use, parse } from 'error-message'

    use((error) => {
      return { code: error.code, msg: `${error.msg}[${error.code}]`}
    })

    const m_error = { code: 10100, msg: 'test' }

    const m = parse(m_error).msg()

    console.log(m)

---

## anOther

    import { use, parse } from 'error-message'

    use((error) => error.msg = `${error.msg}[${error.code}]`)

    const m_error = { code: 10100, msg: 'test' }

    const m = parse(m_error).msg()

    console.log(m)
