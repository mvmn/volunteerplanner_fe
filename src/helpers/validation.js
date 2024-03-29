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
      return yup
        .string()
        .min(3, 'Назва повинна містити щонайменше 3 символи')
        .required('Необхідно вказати назву');
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
      return yup.object().required("Адрес збору обов'язковий").nullable(true);
    case 'shippingAddress':
      return yup.object().required("Адрес доставки обов'язковий").nullable(true);
    case 'category':
      return yup.string().required("Категорія обов'язкова");
    case 'subCategory':
      return yup.string().required("Підкатегорія обов'язкова");
    case 'products':
      return yup.array().of(
        yup.object().shape({
          productName: yup.object().required("Ім'я продукту обов'язкове").nullable(true)
        })
      );
    case 'productName':
      return yup.object().required("Ім'я продукту обов'язкове").nullable(true);
    case 'productCategory':
      return yup.object().required("Категорія обов'язкова").nullable(true);
    case 'productSubcategory':
      return yup.object().required("Підкатегорія обов'язкова").nullable(true);
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
    case 'dueDate':
      return yup
        .date()
        .nullable()
        .when('transportRequired', {
          is: false,
          then: yup.date().required('Необхідно вказати дату')
        });
    case 'organization':
      return yup.string().min(2, 'Щонайменше 2 символи').nullable();
    default:
      return yup.string();
  }
};

export { yupPatterns };
