import React from 'react';
import {
  render,
  fireEvent,
  act,
} from '../../../../__tests__/utils/renderWithProviders';
import CreditCardForm from './CreditCardForm';
import {Alert} from 'react-native';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('CreditCardForm component', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText} = render(
      <CreditCardForm onSubmit={() => {}} />,
    );
    expect(getByPlaceholderText('Card Number')).toBeTruthy();
    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('CVV')).toBeTruthy();
    expect(getByPlaceholderText('Expiry Date')).toBeTruthy();
  });

  it('submits the form with valid data', async () => {
    const onSubmit = jest.fn();
    const {getByPlaceholderText, getByText} = render(
      <CreditCardForm onSubmit={onSubmit} />,
    );

    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText('Card Number'),
        '4221085821690613',
      );

      fireEvent.changeText(getByPlaceholderText('First Name'), 'Gandalf');
      fireEvent.changeText(getByPlaceholderText('Last Name'), 'The Grey');
      fireEvent.changeText(getByPlaceholderText('CVV'), '123');
      fireEvent.changeText(getByPlaceholderText('Expiry Date'), '12/25');
    });

    await act(async () => {
      fireEvent.press(getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      cardNumber: '4221085821690613',
      firstName: 'Gandalf',
      lastName: 'The Grey',
      cvv: '123',
      expiryDate: '12/25',
      errors: {
        cardNumber: '',
        firstName: '',
        lastName: '',
        cvv: '',
        expiryDate: '',
      },
    });
  });

  it('displays an alert when the form is submitted with invalid data', async () => {
    const onSubmit = jest.fn();
    const {getByPlaceholderText, getByText} = render(
      <CreditCardForm onSubmit={onSubmit} />,
    );
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Card Number'), '1234');
    });

    await act(async () => {
      fireEvent.press(getByText('Submit'));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please check your inputs',
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
