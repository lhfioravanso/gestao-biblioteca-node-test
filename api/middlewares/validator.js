const { check, validationResult, oneOf } = require('express-validator/check')

const createBookValidation = () => {
    return [
        check('title').exists(),
        check('isbn').exists(),
        check('category_id').exists().withMessage('Id da categoria é obrigatório.'),
        check('year').exists()
    ]
}
const updateBookValidation = () => {
    return oneOf([
        check('title').exists(),
        check('isbn').exists(),
        check('category_id').exists(),
        check('year').exists()
    ])
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }  

  return res.status(422).json(errors.array())
}

module.exports = {
  createBookValidation,
  updateBookValidation,
  validate,
}
