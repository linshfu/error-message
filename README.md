# error-message

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
