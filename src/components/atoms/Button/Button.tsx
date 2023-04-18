import React from 'react';
import {Pressable, SxProp, Text} from 'dripsy';

interface IButton extends React.ComponentProps<typeof Pressable> {
  sx?: SxProp;
  text: string;
}

const Button: React.FC<IButton> = ({sx, text, onPress}) => {
  return (
    <Pressable testID="button" variant="buttons.primary" {...{sx, onPress}}>
      <Text>{text}</Text>
    </Pressable>
  );
};

export default Button;
