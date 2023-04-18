import React from 'react';
import {DripsyProvider} from 'dripsy';
import {theme} from './styles/theme';

// screens
import CreditCardValidationScreen from './screens/CreditCardValidationScreen/CreditCardValidationScreen';
import {StatusBar} from 'react-native';

const App: React.FC = () => {
  return (
    <DripsyProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <CreditCardValidationScreen />
    </DripsyProvider>
  );
};

export default App;
