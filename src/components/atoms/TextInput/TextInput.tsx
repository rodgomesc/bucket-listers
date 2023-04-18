import React from 'react';
import {TextInput as RNTextInput, SxProp, useDripsyTheme} from 'dripsy';

export interface ITextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  testID?: string;
  sx?: SxProp;
}
export const txtInputcommonStyles = {
  backgroundColor: 'surface',
  color: 'primary',
  paddingVertical: 'm',
  borderRadius: 's',
  fontSize: 16,
  borderWidth: 1,
  borderColor: 'secondary',
  paddingHorizontal: 's',
};

const TextInput: React.FC<ITextInputProps> = ({
  onChangeText,
  placeholder,
  value,
  sx,
  testID,
}) => {
  const {
    theme: {colors},
  } = useDripsyTheme();
  return (
    <RNTextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors.primary}
      sx={{...txtInputcommonStyles, ...sx}}
      testID={testID}
    />
  );
};

export default TextInput;
