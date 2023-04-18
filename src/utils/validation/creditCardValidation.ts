import * as Yup from 'yup';

export const creditCardSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/,
      'Invalid card number',
    )
    .required('Card number is required'),
  firstName: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    )
    .required('First name is required'),
  lastName: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      'Only alphabetic characters and spaces are allowed',
    )
    .required('Last name is required'),
  cvv: Yup.string()
    .matches(/^[0-9]{3,4}$/, 'CVV must be either 3 or 4 digits')
    .required('CVV is required'),
  expiryDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      'Invalid expiry date format (MM/YY)',
    )
    .test('notExpired', 'Expiry date must be in the future', function (value) {
      const stringValue = value || '';
      const [month, year] = stringValue.split('/');
      const expiryYear = Number(`20${year}`);
      const expiryMonth = Number(month);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      if (expiryYear > currentYear) {
        return true;
      } else if (expiryYear === currentYear) {
        return expiryMonth > currentMonth;
      } else {
        return false;
      }
    })
    .required('Expiry date is required'),
});
