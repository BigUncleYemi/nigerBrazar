/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Box, View, Button, IconButton, Icon, VStack} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import Text from '../Components/Text';
import FormInput from '../Components/Input';
import {Facebook, Google} from '../Components/Svg';
import {AuthTemplateScreen} from './AuthTemplate';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().trim().email().required(),
  phoneNumber: yup.number().required(),
  password: yup.string().required(),
});

export function RegisterScreen({navigation}) {
  const {t} = useTranslation();
  const phoneInput = React.useRef(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    console.log(data);
    navigation.navigate('Home');
  };
  return (
    <AuthTemplateScreen
      text="registerText"
      linkText="registerLinkText"
      linkLocation="Login"
      link="registerLink"
      navigation={navigation}>
      <VStack mt={4} width="100%" space={2}>
        <FormInput
          name="name"
          label="Name"
          rules={{required: 'Field is required'}}
          {...{control, errors}}
        />
        <FormInput
          name="phoneNumber"
          label="Phone Number"
          type="number"
          rules={{required: 'Field is required'}}
          Component={({value, onChangeText, onBlur}) => (
            <PhoneInput
              ref={phoneInput}
              defaultCode="NE"
              layout="first"
              defaultValue={value}
              onChangeFormattedText={text => {
                onChangeText(text);
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
          )}
          {...{control, errors}}
        />
        <FormInput
          name="email"
          label="Email"
          rules={{required: 'Field is required', type: 'email'}}
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
          colorScheme="orange">
          {t('registerBtnText')}
        </Button>
        <Box p={2} pb={4} alignItems="center">
          <Text bold mt={3}>
            {t('continue')}{' '}
          </Text>
          <Box mt={2} pb={4} alignItems="center" flexDirection="row">
            <IconButton
              mx={1}
              icon={<Icon size="md" as={<Google />} color="white" />}
            />
            <IconButton
              mx={1}
              icon={<Icon size="md" as={<Facebook />} color="white" />}
            />
          </Box>
        </Box>
        <View pb={4} />
      </VStack>
    </AuthTemplateScreen>
  );
}
