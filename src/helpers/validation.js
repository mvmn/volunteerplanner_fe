import 'yup-phone';

import * as yup from 'yup';

import dictionary from '../dictionary';

const yupPatterns = key => {
  switch (key) {
    case 'displayName':
      return yup.string().required("Ім'я обов'язкове").min(2, "Ім'я занадто коротке");
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
    case 'customer':
      return yup.string().required("Замовник обов'язковий");
    case 'collectionAddress':
      return yup.string().required("Адрес збору обов'язковий");
    case 'shippingAddress':
      return yup.string().required("Адреса доставки обов'язкова");
    case 'category':
      return yup.string().required("Категорія обов'язкова");
    case 'subCategory':
      return yup.string().required("Підкатегорія обов'язкова");
    case 'productName':
      return yup.string().required("Ім'я продукту обов'язкове");
    case 'quantity':
      return yup.number().required("Кількість обов'язкова").min(1, 'Додайте хоча б одну одиницю');
    case 'priority':
      return yup.string().required("Пріорітет обов'язковий");
    case 'date':
      return yup.string().required('Укажіть дату');
    case 'note':
      return yup.string().min(3, 'Поле занадто коротке');
    case 'notEmptyString':
      return yup.string().required(dictionary.fieldIsRequired);
    case 'geoName':
      return yup
        .object()
        .shape({
          id: yup.string().required('Необхідно вказати ідентифікатор'),
          name: yup.string().required('Необхідно вказати назву')
        })
        .nullable()
        .required(dictionary.fieldIsRequired);
    default:
      return yup.string();
  }
};

export { yupPatterns };
