import React, {useReducer} from 'react';
import {SxProp, View} from 'dripsy';
import * as Yup from 'yup';

import CardInput from '../../molecules/CardInput/CardInput';
import Button from '../../atoms/Button/Button';

import {creditCardSchema} from '../../../utils/validation/creditCardValidation';
import {Alert} from 'react-native';

interface ICreditCardFormProps {
  onSubmit: (fields: typeof initialState) => void;
  sx?: SxProp;
  testID?: string;
}

interface IFormAction {
  type: 'SET_FIELD';
  field: keyof typeof initialState;
  value: string;
}

interface IErrorAction {
  type: 'SET_ERROR';
  field: keyof typeof initialState;
  error: string;
}

const initialState = {
  cardNumber: '',
  firstName: '',
  lastName: '',
  cvv: '',
  expiryDate: '',
  errors: {
    cardNumber: '',
    firstName: '',
    lastName: '',
    cvv: '',
    expiryDate: '',
  },
};

const formReducer = (
  state: typeof initialState,
  action: IFormAction | IErrorAction,
) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {...state, [action.field]: action.value};
    case 'SET_ERROR':
      return {
        ...state,
        errors: {...state.errors, [action.field]: action.error},
      };
    default:
      return state;
  }
};

const CreditCardForm: React.FC<ICreditCardFormProps> = ({
  onSubmit,
  sx,
  testID,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async () => {
    try {
      await creditCardSchema.validate(state, {abortEarly: false});
      onSubmit(state);
    } catch (error: Yup.ValidationError | any) {
      Alert.alert('Error', 'Please check your inputs');
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          const field = err.path as keyof typeof initialState.errors;
          dispatch({type: 'SET_ERROR', field, error: err.message});
        });
      }
    }
  };

  const handleInputChange = async (
    field: keyof typeof initialState,
    value: string,
  ) => {
    dispatch({type: 'SET_FIELD', field, value});
    try {
      const validator = Yup.reach(creditCardSchema, field);
      await (validator as any).validate(value);
      // If valid, clear the error state for the field
      dispatch({type: 'SET_ERROR', field, error: ''});
    } catch (error: Yup.ValidationError | any) {
      if (error instanceof Yup.ValidationError) {
        // If invalid, set the error state for the field
        dispatch({type: 'SET_ERROR', field, error: error.message});
      }
    }
  };

  return (
    <View sx={{...sx}} testID={testID}>
      <CardInput
        onChangeText={value => handleInputChange('cardNumber', value)}
        value={state.cardNumber}
        placeholder="Card Number"
        error={state.errors.cardNumber}
      />
      <CardInput
        onChangeText={value => handleInputChange('firstName', value)}
        value={state.firstName}
        placeholder="First Name"
        error={state.errors.firstName}
      />
      <CardInput
        onChangeText={value => handleInputChange('lastName', value)}
        value={state.lastName}
        placeholder="Last Name"
        error={state.errors.lastName}
      />
      <View
        sx={{
          flexDirection: 'row',
        }}>
        <CardInput
          sx={{marginRight: 's'}}
          onChangeText={value => handleInputChange('cvv', value)}
          value={state.cvv}
          placeholder="CVV"
          error={state.errors.cvv}
          mask={[/\d/, /\d/, /\d/, /\d/]}
        />
        <CardInput
          onChangeText={value => handleInputChange('expiryDate', value)}
          value={state.expiryDate}
          placeholder="Expiry Date"
          mask={[/\d/, /\d/, '/', /\d/, /\d/]}
          error={state.errors.expiryDate}
        />
      </View>
      <Button sx={{mt: 'l'}} onPress={handleSubmit} text="Submit" />
    </View>
  );
};

export default CreditCardForm;
