import React from 'react';
import {
  render,
  fireEvent,
} from '../../../../__tests__/utils/renderWithProviders';
import TextInput from './TextInput';

describe('TextInput component', () => {
  it('renders the TextInput with the given value and placeholder', () => {
    const {getByPlaceholderText} = render(
      <TextInput
        value="Sample text"
        placeholder="Enter text"
        onChangeText={() => {}}
      />,
    );

    const input = getByPlaceholderText('Enter text');
    expect(input.props.value).toBe('Sample text');
  });

  it('handles onChangeText event', () => {
    const onChangeText = jest.fn();
    const {getByPlaceholderText} = render(
      <TextInput
        value=""
        placeholder="Enter text"
        onChangeText={onChangeText}
      />,
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'New text');

    expect(onChangeText).toHaveBeenCalledWith('New text');
  });

  it('applies the provided sx prop', () => {
    const sx = {borderColor: 'blue'};
    const {getByTestId} = render(
      <TextInput
        value=""
        placeholder="Enter text"
        onChangeText={() => {}}
        sx={sx}
        testID="text-input"
      />,
    );

    const input = getByTestId('text-input');
    expect(input.props.style).toContainEqual(expect.objectContaining(sx));
  });
});
