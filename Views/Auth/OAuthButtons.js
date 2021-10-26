/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { IconButton, Icon } from 'native-base';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Facebook, Google } from '../Components/Svg';
import { useOAuthFacebook, useOAuthGoogle } from '../../Hooks/useOAuthHook';

export function GoogleButton() {
  const OAuthGoogle = useOAuthGoogle();
  return (
    <IconButton
      mx={1}
      icon={<Icon size="md" as={<Google />} color="white" />}
      onPress={() => {
        GoogleSignin.configure({
          offlineAccess: true,
          // androidClientId: 'ADD_GOOGLE_ANDROID_CLIENT_ID_HERE',
          androidClientId: '884037126176-64g6b4o0c3go82m1k1lbfiigdl5o031j.apps.googleusercontent.com',
          // iosClientId: 'ADD_GOOGLE_iOS_CLIENT_ID_HERE',
          iosClientId: '884037126176-mvc5gvgqvi9l7i79plndlebnd5qkj5a0.apps.googleusercontent.com',
          // webClientId: 'YOUR_WEB_APPLICATION_CLIENT_ID_HERE',
          webClientId: '884037126176-a910honasuakja42u3h1nkt8dmfm4sn9.apps.googleusercontent.com',
        });
        async function signIn() {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //If login is successful you'll get user info object in userInfo below I'm just printing it to console. You can store this object in a usestate or use it as you like user is logged in.
            //console.log(userInfo.idToken)
            OAuthGoogle.mutate({tokenId: userInfo.idToken});
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              alert("You cancelled the sign in.");
            } else if (error.code === statusCodes.IN_PROGRESS) {
              alert("Google sign In operation is in process");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              alert("Play Services not available");
            } else {
              alert("Something unknown went wrong with Google sign in. " + error.message);
            }
          }
        }
        signIn()
      }}
    />
  );
}

export function FacebookButton() {
  const OAuthFacebook = useOAuthFacebook();
  return (
    <IconButton
      mx={1}
      icon={<Icon size="md" as={<Facebook />} color="white" />}
      onPress={() => {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
          async function (result) {
            if (result.isCancelled) {
              alert("Login Cancelled " + JSON.stringify(result))
            } else {
              const res = await AccessToken.getCurrentAccessToken();
              OAuthFacebook.mutate({
                accessToken: res.accessToken,
                userId: res.userID,
              });
              //console.log(JSON.stringify(result), 'jjjjj', res);
              alert("Login Success " + result.toString());
              alert("Login success with  permisssions: " + result.grantedPermissions.toString());
            }
          },
          function (error) {
            alert("Login failed with error: " + error);
          }
        )
      }}
    />
  )
}