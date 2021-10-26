/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, View, Button, VStack, Link } from 'native-base';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Text from '../Components/Text';
import FormInput from '../Components/Input';
import GeneralStyle from '../Styles';
import { AuthTemplateScreen } from './AuthTemplate';
import useSignInUserEmail from '../../Hooks/useSignInUserEmail';
import { GoogleButton, FacebookButton } from './OAuthButtons';

const schema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().required(),
});

export function LoginScreen({ navigation }) {
  const signInEmail = useSignInUserEmail();
  const { t } = useTranslation();
  const phoneInput = React.useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    //console.log(data);
    signInEmail.mutate(data);
    // navigation.navigate('Home');
  };
  return (
    <AuthTemplateScreen
      text="loginText"
      linkText="loginLinkText"
      linkLocation="Register"
      link="loginLink"
      navigation={navigation}>
      <VStack mt={4} width="100%" space={2}>
        <FormInput
          name="email"
          label="Email"
          rules={{ required: 'Field is required', type: 'email' }}
          {...{ control, errors }}
        />
        <FormInput
          name="password"
          label="Password"
          type={'password'}
          rules={{ required: 'Field is required', type: 'password' }}
          {...{ control, errors }}
        />
        <Link
          mb={2}
          mt={-3}
          onPress={() => navigation.navigate('ForgetPassword')}>
          <Text bold style={GeneralStyle.authLink}>
            {t('forgetPasswordLinkText')}
          </Text>
        </Link>
        <Button
          _text={{
            color: 'white',
            fontWeight: 'bold',
          }}
          onPress={handleSubmit(onSubmit)}
          mt={5}
          isLoading={signInEmail.status === 'loading'}
          isDisabled={signInEmail.status === 'loading'}
          isLoadingText={'Logging In...'}
          colorScheme="orange">
          {t('loginBtnText')}
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
