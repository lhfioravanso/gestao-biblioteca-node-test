const { check, oneOf } = require('express-validator/check');

exports.createBook = [
    check('title').exists(),
    check('isbn').exists(),
    check('category_id').exists().withMessage('Id da categoria é obrigatório.'),
    check('year').exists()
];

exports.updateBook = oneOf([
    check('title').exists(),
    check('isbn').exists(),
    check('category_id').exists(),
    check('year').exists()
]);