/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Button, VStack} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Text from '../Components/Text';
import FormInput from '../Components/Input';
import {AuthTemplateScreen} from './AuthTemplate';

const schema = yup.object().shape({
  email: yup.string().trim().email().required(),
});

export function ForgetPasswordScreen({navigation}) {
  const {t} = useTranslation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    //console.log(data);
    navigation.navigate('ResetPassword', {
      BigText: 'SucForgotPasswordBigText',
      SmallText: 'SucForgotPasswordSmallText',
      BtnText: 'SucForgotPasswordBtnText',
      BtnActionLink: 'Login',
    });
  };
  return (
    <AuthTemplateScreen text="forgetPasswordText" navigation={navigation}>
      <VStack mt={4} width="100%" space={2}>
        <Text bold mb={2} style={{color: '#848484'}}>
          {t('forgetPasswordTextHint')}
        </Text>
        <FormInput
          name="email"
          label="Email"
          rules={{required: 'Field is required', type: 'email'}}
          {...{control, errors}}
        />
        <Button onPress={handleSubmit(onSubmit)} mt={5} colorScheme="orange">
          {t('forgetPasswordBtnText')}
        </Button>
        <View pb={4} />
      </VStack>
    </AuthTemplateScreen>
  );
}
