import React from 'react';
import {View, styled, Text, useDripsyTheme, useSx} from 'dripsy';
import MaskInput, {MaskInputProps} from 'react-native-mask-input';

import {
  txtInputcommonStyles,
  ITextInputProps,
} from '../../atoms/TextInput/TextInput';

type ICardInput = {
  error?: string;
} & ITextInputProps &
  MaskInputProps;

const ErrorAccesory = styled(Text)({
  flex: 1,
  flexWrap: 'wrap',
  height: 28,
  borderRadius: 10,
  paddingVertical: 2,
  color: 'neutral',
  fontSize: 12,
});

const CardInput: React.FC<ICardInput> = ({
  onChangeText,
  placeholder,
  value,
  sx,
  error,
  ...rest
}) => {
  const {theme} = useDripsyTheme();
  const sxFn = useSx();
  return (
    <View sx={{flex: 1, flexGrow: 1, minHeight: 86}}>
      <MaskInput
        placeholderTextColor={theme.colors.primary}
        {...{onChangeText, placeholder, value}}
        style={sxFn({
          ...txtInputcommonStyles,
          borderColor: error ? theme.colors.error : theme.colors.border,
          ...sx,
        })}
        {...rest}
      />
      <ErrorAccesory>{error}</ErrorAccesory>
    </View>
  );
};

export default CardInput;
