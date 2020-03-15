const { check, validationResult, oneOf } = require('express-validator/check')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }  

  return res.status(422).json(errors.array())
}

const createBookValidation = () => {
    return [
        check('title').exists(),
        check('isbn').exists(),
        check('category_id').exists(),
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

const favoriteBookValidation = () => {
  return [
      check('user_id').exists(),
      check('book_id').exists()
  ]
}

const authenticateValidation = () => {
  return [
      check('email').exists(),
      check('password').exists()
  ]
}


module.exports = {
  validate,
  createBookValidation,
  updateBookValidation,
  createCategoryValidation,
  createUserValidation,
  updateUserValidation,
  favoriteBookValidation,
  authenticateValidation
}
