import React from 'react';

import ScreenContainer from '../../components/templates/ScreenContainer';

import CreditCardForm from '../../components/organisms/CreditCardForm/CreditCardForm';
import {Alert} from 'react-native';

const CreditCardValidationScreen = () => {
  return (
    <ScreenContainer>
      <CreditCardForm
        testID="credit-card-form"
        onSubmit={fields => {
          Alert.alert('Form submitted', JSON.stringify(fields, null, 2));
        }}
      />
    </ScreenContainer>
  );
};

export default CreditCardValidationScreen;
