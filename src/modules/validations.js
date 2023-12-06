const { check } = require('express-validator');

const userValidations = [
  check('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters')
    .matches(/^[A-Z]/).withMessage('Name must start with a capital letter'),

  check('surname')
    .notEmpty().withMessage('Surname is required')
    .isLength({ min: 3 }).withMessage('Surname must be at least 3 characters')
    .matches(/^[A-Z]/).withMessage('Surname must start with a capital letter'),

  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),

  check('birthdate')
    .notEmpty().withMessage('Birthdate is required')
    .custom((value) => {
      const birthdate = new Date(value);
      const now = new Date();
      const age = now.getFullYear() - birthdate.getFullYear();
      if (age < 18) {
        throw new Error('You must be at least 18 years old');
      }
      return true;
    }),

  check('phoneNumber')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Invalid phone number'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one number, and one special character'),
];


  module.exports = {userValidations}