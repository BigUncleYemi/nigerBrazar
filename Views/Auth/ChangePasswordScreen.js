/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {View, VStack, Button, Toast} from 'native-base';
import {AuthTemplateScreen} from './AuthTemplate';
import FormInput from '../Components/Input';
import Text from '../Components/Text';
import useChangePassword from '../../Hooks/useChangePassword';
import {useTranslation} from 'react-i18next';

const schema = yup.object().shape({
  oldPassword: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

export default function ChangePasswordScreen({navigation}) {
  const {t} = useTranslation();
  const changePassword = useChangePassword();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = React.useCallback(async data => {
    // console.log(data, 'jhvhjh');
    if (data.password === data.confirmPassword) {
      changePassword.mutate(data);
      reset();
    } else {
      Toast.show({
        title: 'Validation Error',
        description: 'New Password and confirm password are not the same.',
      });
    }
  });

  return (
    <AuthTemplateScreen
      showBackBtn={false}
      text="ChangeYourPassword"
      navigation={navigation}>
      <VStack mt={4} width="100%" space={2}>
        <Text bold mt={-5} mb={4} style={{color: '#848484'}}>
          {/* {t('forgetPasswordTextHint')} */}
          Enter your old and new password.
        </Text>
        <FormInput
          name="oldPassword"
          label="Old Password"
          type={'password'}
          rules={{required: 'Field is required', type: 'password'}}
          {...{control, errors}}
        />
        <FormInput
          name="password"
          label="New Password"
          type={'password'}
          rules={{required: 'Field is required', type: 'password'}}
          {...{control, errors}}
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
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
          isLoading={changePassword.status === 'loading'}
          isDisabled={changePassword.status === 'loading'}
          isLoadingText={'Updating...'}
          mt={5}
          colorScheme="orange">
          {t('forgetPasswordBtnText')}
          {/* Change Password */}
        </Button>
        <View pb={4} />
      </VStack>
    </AuthTemplateScreen>
  );
}
