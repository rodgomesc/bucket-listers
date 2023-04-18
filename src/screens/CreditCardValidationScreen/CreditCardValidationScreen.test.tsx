import React from 'react';
import {
  render,
  fireEvent,
  act,
} from '../../../__tests__/utils/renderWithProviders';
import CreditCardValidationScreen from './CreditCardValidationScreen';
import {Alert} from 'react-native';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('CreditCardValidationScreen component', () => {
  it('renders the CreditCardForm', () => {
    const {getByTestId} = render(<CreditCardValidationScreen />);
    const creditCardForm = getByTestId('credit-card-form');
    expect(creditCardForm).toBeTruthy();
  });

  it('displays the alert when the form is submitted', async () => {
    const {getByTestId} = render(<CreditCardValidationScreen />);
    const creditCardForm = getByTestId('credit-card-form');

    const formData = {
      cardNumber: '4242424242424242',
      cardExpiry: '12/25',
      cardCvv: '123',
    };

    await act(async () => {
      fireEvent(creditCardForm, 'onSubmit', formData);
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Form submitted',
      JSON.stringify(formData, null, 2),
    );
  });
});
