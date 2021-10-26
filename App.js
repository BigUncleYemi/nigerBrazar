/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {StatusBar, Platform, LogBox} from 'react-native';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import i18next from 'i18next';
import i18nextReactNative from 'i18next-react-native-language-detector';
import {initReactI18next} from 'react-i18next';
import {QueryClient, QueryClientProvider} from 'react-query';
import {setCustomTextInput, setCustomText} from 'react-native-global-props';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Index from './Views';

LogBox.ignoreLogs(['Setting a timer']);
const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

const customTextProps = {
  allowFontScaling: false,
  fontFamily: 'Roboto',
};

setCustomTextInput(customTextProps);
setCustomText(customTextProps);

i18next
  .use(i18nextReactNative)
  .use(initReactI18next)
  .init({
    fallbackLng: 'EN',
    debug: true,
    resources: {
      EN: {
        translation: {
          continue: 'Continue with',
          obPage1: 'Lo rem ip sum dol or Lor em ips um dol or',
          obPage2: 'Sed ut persp iciatis omnis iste natus',
          obPage3: 'At vero eos et accusamus ipsum dolor',
          singUp: 'SIGN UP',
          registerText: 'Let Get Started',
          registerLinkText: 'already have an account ?',
          registerLink: 'Login',
          registerBtnText: 'Register',
          loginText: 'Hey,\nWelcome Back',
          loginLinkText: 'or are you new?,',
          loginLink: 'Create an account',
          loginBtnText: 'Sign In',
          forgetPasswordText: 'Forgotten Your Password',
          forgetPasswordTextHint: 'Please enter your registered email',
          forgetPasswordLinkText: 'Forgot password ?',
          forgetPasswordBtnText: 'Send Reset Link',
          hello: 'Hello world',
          change: 'Change language',
          SucForgotPasswordBigText: 'Reset Link Sent',
          SucForgotPasswordSmallText:
            'Please check your mail for the reset link to reset your password.',
          SucForgotPasswordBtnText: 'Close',
          ChangeYourPassword: 'Change Your Password',
          continueHome: "Let's Go",
          playmodal: 'This is a modal!',
          dismiss: 'Dismiss',
        },
      },
      FR: {
        translation: {
          continue: 'Continue with',
          obPage1: 'Lorem ipsum dolor Lorem ipsum dolor',
          obPage2: 'Sed ut persp iciatis omnis iste natus',
          obPage3: 'At vero eos et accusamus ipsum dolor',
          singUp: 'SIGN UP',
          registerText: 'Let Get Started',
          registerLinkText: 'already have an account ?',
          registerLink: 'Login',
          registerBtnText: 'Register',
          loginText: 'Hey,\n Login Now',
          loginLinkText: 'or are you new?,',
          loginLink: 'Create an account',
          loginBtnText: 'Sign In',
          forgetPasswordText: 'Forgotten Your Password',
          forgetPasswordTextHint: 'Please enter your registered email',
          forgetPasswordLinkText: 'Forgot password ?',
          forgetPasswordBtnText: 'Send Reset Link',
          hello: 'Hej världen',
          change: 'Byt språk',
          SucForgotPasswordBigText: 'Reset Link Sent',
          SucForgotPasswordSmallText:
            'Please check your mail for the reset link to reset your password.',
          SucForgotPasswordBtnText: 'Close',
          ChangeYourPassword: 'Change gggg Your Password',
          continueHome: "Let's Go",
          playmodal: "C'est un modal !",
          dismiss: 'Rejeter',
        },
      },
    },
  });

const App = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            barStyle={
              Platform.OS === 'android' ? 'light-content' : 'dark-content'
            }
          />
          <Index />
        </QueryClientProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export {i18next};
export default App;
