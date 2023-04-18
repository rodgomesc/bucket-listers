import React from 'react';
import {
  render,
  fireEvent,
} from '../../../../__tests__/utils/renderWithProviders';
import Button from './Button';

describe('Button component', () => {
  it('renders the button with the given text', () => {
    const {getByText} = render(<Button text="Click me" />);

    const buttonText = getByText('Click me');
    expect(buttonText).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPress = jest.fn();
    const {getByText} = render(<Button text="Click me" onPress={onPress} />);

    const buttonText = getByText('Click me');
    fireEvent.press(buttonText);

    expect(onPress).toHaveBeenCalled();
  });

  it('applies the provided sx prop', () => {
    const sx = {backgroundColor: 'blue'};
    const {getByTestId} = render(
      <Button text="Click me" onPress={() => {}} sx={sx} testID="button" />,
    );

    const button = getByTestId('button');
    expect(button.props.style).toContainEqual(expect.objectContaining(sx));
  });
});
