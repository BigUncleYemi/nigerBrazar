/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, View, Button, VStack, Select, CheckIcon} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import Text from '../Components/Text';
import FormInput from '../Components/Input';
import {AuthTemplateScreen} from './AuthTemplate';
import useSignUpUserEmail from '../../Hooks/useSignUpUserEmail';
import {GoogleButton, FacebookButton} from './OAuthButtons';

const schema = yup.object().shape({
  lastName: yup.string().required(),
  firstName: yup.string().required(),
  email: yup.string().trim().email().required(),
  phoneNumber: yup.number().required(),
  password: yup.string().required(),
  language: yup.string().required(),
});

export function RegisterScreen({navigation}) {
  const signUpEmail = useSignUpUserEmail();
  const [pn, setPN] = useState(null);
  const {t} = useTranslation();
  const phoneInput = React.useRef(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = React.useCallback(async data => {
    //console.log(data);
    signUpEmail.mutate({
      ...data,
      phoneNumber: `+${data.phoneNumber}`,
    });
    // navigation.navigate('Home');
  });
  return (
    <AuthTemplateScreen
      text="registerText"
      linkText="registerLinkText"
      linkLocation="Login"
      link="registerLink"
      navigation={navigation}>
      <VStack mt={4} width="100%" space={2}>
        <FormInput
          name="firstName"
          label="First Name"
          rules={{required: 'Field is required'}}
          {...{control, errors}}
        />
        <FormInput
          name="lastName"
          label="Last Name"
          rules={{required: 'Field is required'}}
          {...{control, errors}}
        />
        <FormInput
          name="phoneNumber"
          label="Phone Number"
          type="number"
          rules={{required: 'Field is required'}}
          Component={({value, onChangeText, onBlur}) => {
            const fecthText = React.useCallback(async text => {
              onChangeText(text);
              return;
            });
            return (
              <PhoneInput
                ref={phoneInput}
                defaultCode={phoneInput?.current?.getCountryCode() || 'NE'}
                defaultValue={
                  phoneInput?.current?.getNumberAfterPossiblyEliminatingZero()
                    ?.number
                }
                layout="first"
                onChangeFormattedText={text => {
                  fecthText(text);
                }}
                textContainerStyle={{
                  backgroundColor: 'transparent',
                  borderRadius: 5,
                }}
                textInputStyle={{
                  height: 25,
                  padding: 0,
                }}
                containerStyle={
                  value && !phoneInput?.current?.isValidNumber(value)
                    ? {
                        borderWidth: 1,
                        borderColor: '#ff392b',
                        borderRadius: 5,
                        width: '100%',
                      }
                    : {
                        borderWidth: 1,
                        borderColor: '#D7D7D7',
                        borderRadius: 5,
                        width: '100%',
                      }
                }
              />
            );
          }}
          {...{control, errors}}
        />
        <FormInput
          name="email"
          label="Email"
          rules={{required: 'Field is required', type: 'email'}}
          {...{control, errors}}
        />
        <FormInput
          name="language"
          label="Language"
          rules={{required: 'Field is required'}}
          Component={({value, onChangeText, onBlur}) => {
            return (
              <Select
                selectedValue={value}
                minWidth={200}
                accessibilityLabel="Select your preferred Language"
                placeholder="Select your preferred Language"
                onValueChange={itemValue => {
                  onChangeText(itemValue);
                }}
                _selectedItem={{
                  bg: 'orange.600',
                  _text: {color: 'white'},
                  endIcon: <CheckIcon size={5} />,
                }}
                mt={1}>
                <Select.Item label="French" value="FR" />
                <Select.Item label="English" value="EN" />
              </Select>
            );
          }}
          {...{control, errors}}
        />
        <FormInput
          name="password"
          label="Password"
          type={'password'}
          rules={{required: 'Field is required', type: 'password'}}
          {...{control, errors}}
        />
        <Button
          _text={{
            color: 'white',
            fontWeight: 'bold',
          }}
          onPress={handleSubmit(onSubmit)}
          mt={5}
          isLoading={signUpEmail.status === 'loading'}
          isDisabled={signUpEmail.status === 'loading'}
          isLoadingText={'Signing Up...'}
          colorScheme="orange">
          {t('registerBtnText')}
        </Button>
        <Box p={2} pb={4} alignItems="center">
          <Text bold mt={3}>
            {t('continue')}{' '}
          </Text>
          <Box mt={2} pb={4} alignItems="center" flexDirection="row">
            <GoogleButton />
            <FacebookButton />
          </Box>
        </Box>
        <View pb={4} />
      </VStack>
    </AuthTemplateScreen>
  );
}
