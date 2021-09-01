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
import {View, VStack, Button} from 'native-base';
import {AuthTemplateScreen} from './AuthTemplate';
import FormInput from '../Components/Input';
import Text from '../Components/Text';

const schema = yup.object().shape({
  newPassword: yup.string().required(),
  oldPassword: yup.string().required(),
});

export default function ChangePasswordScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    console.log(data, 'jhvhjh');
    navigation.navigate('FeedBack', {
      BigText: 'Password Changed',
      SmallText: 'You can now access your account via your new password.',
      BtnText: 'Close',
      BtnActionLink: 'Settings',
    });
  };
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
          name="newPassword"
          label="New Password"
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
          {/* {t('forgetPasswordBtnText')} */}
          Change Password
        </Button>
        <View pb={4} />
      </VStack>
    </AuthTemplateScreen>
  );
}
