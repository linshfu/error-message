# error-message

    import ErrorMessage from 'error-message'

    ErrorMessage.use((error) => {
      const msg = `${error.msg}[${error.code}]`
      return { code: error.code, msg: msg}
    })

    const m_error = { code: 10100, msg: 'test' }

    const m = ErrorMessage.parse(m_error).msg()

    console.log(m)
