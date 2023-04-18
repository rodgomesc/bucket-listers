import React from 'react';
import {
  render,
  fireEvent,
} from '../../../../__tests__/utils/renderWithProviders';
import CardInput from './CardInput';

describe('CardInput component', () => {
  it('renders the CardInput with the given value and placeholder', () => {
    const {getByPlaceholderText} = render(
      <CardInput
        value="Sample text"
        placeholder="Enter text"
        onChangeText={() => {}}
        mask={undefined}
      />,
    );

    const input = getByPlaceholderText('Enter text');
    expect(input.props.value).toBe('Sample text');
  });

  it('handles onChangeText event', () => {
    const onChangeText = jest.fn();
    const {getByPlaceholderText} = render(
      <CardInput
        value=""
        placeholder="Enter text"
        onChangeText={onChangeText}
        mask={undefined}
      />,
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'New text');

    expect(onChangeText).toHaveBeenCalledWith(
      'New text',
      'New text',
      'New text',
    );
  });

  it('displays the error message', () => {
    const {getByText} = render(
      <CardInput
        value=""
        placeholder="Enter text"
        onChangeText={() => {}}
        mask={undefined}
        error="Error message"
      />,
    );

    const errorMessage = getByText('Error message');
    expect(errorMessage).toBeTruthy();
  });

  it('applies the provided sx prop', () => {
    const sx = {borderColor: 'blue'};
    const {getByTestId} = render(
      <CardInput
        value=""
        placeholder="Enter text"
        onChangeText={() => {}}
        mask={undefined}
        sx={sx}
        testID="card-input"
      />,
    );

    const input = getByTestId('card-input');
    expect(input.props.style.borderColor).toBe('blue');
  });
});
