# error-message

    import ErrorMessage from 'error-message'
    
    ErrorMessage.use(function (error) {
      return { code: error.code, msg: `${error.msg}[${error.code}]`}
    })

    const error = {
      code: 10100,
      msg: 'test'
    }

    const m = ErrorMessage.parse(error).msg()

    console.log(m)
