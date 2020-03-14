const { check, validationResult, oneOf } = require('express-validator/check')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }  

  return res.status(422).json(errors.array())
}

//TODO: create customValidation for 'category_id' checks if is valid category on db.

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

const createUserValidation = () => {
  return [
      check('email').exists(),
      check('name').exists(),
      check('password').exists(),
      check('birth_date').exists(),
      check('phone_number').exists()
  ]
}
const updateUserValidation = () => {
  return oneOf([
    check('name').exists(),
    check('password').exists(),
    check('birth_date').exists(),
    check('phone_number').exists()
  ])
}

const createCategoryValidation = () => {
  return [
      check('name').exists()
  ]
}



module.exports = {
  validate,
  createBookValidation,
  updateBookValidation,
  createCategoryValidation,
  createUserValidation,
  updateUserValidation
}
