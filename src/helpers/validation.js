import 'yup-phone';

import * as yup from 'yup';

const yupPatterns = key => {
  switch (key) {
    case 'userName':
      return yup.string().required("Ім'я обов'язкове").min(2, "Ім'я занадто коротке");
    case 'fullName':
      return yup.string('').required("Поле обо'язкове");
    case 'email':
      return yup
        .string()
        .email('Емейл повинен бути валідним')
        .required('Емейл є обовязковим')
        .min(4, 'Занадто короткий!')
        .max(30, 'Занадто довгий');
    case 'name':
      return yup.string().min(3, 'Name must be not empty').required('Name is required');
    case 'signInPass':
      return yup.string().required("Пароль є обов'язковим").min(6, 'Пароль занадто короткий');
    case 'signUpPass':
      return yup
        .string()
        .required("Пароль є обов'язковим")
        .min(6, 'Пароль занадто короткий')
        .matches(/[a-zA-Z]/, 'Пароль повинен містити латинські букви');
    case 'phoneNumber':
      return yup.string().phone('UA', true, 'Телефон має бути валідним');
    case 'confirmPassWord':
      return yup
        .string()
        .oneOf([yup.ref('password'), null], 'Паролі не збігаються')
        .required('Обовязково пітверідть пароль');
    case 'note':
      return yup.string().min(3, 'Поле занадто коротке');
    default:
      return yup.string();
  }
};

export { yupPatterns };
