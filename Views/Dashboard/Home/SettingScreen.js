/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import {Dimensions} from 'react-native';
import Text from '../../Components/Text';
import { useQueryClient } from 'react-query';
import { LoginManager } from 'react-native-fbsdk-next';
import { CommonActions } from '@react-navigation/native';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {
  View,
  VStack,
  ScrollView,
  Divider,
  HStack,
  Pressable,
  Button,
  Center,
  useToast,
  Toast,
} from 'native-base';
import Header from '../../Components/Header';
import SellerDetail from '../../Components/SellerDetail';
import requireAuth from '../../../Hoc/requireAuth';
import Utils from '../../../utils';

const width = Dimensions.get('screen').width;

const SettingRoutes = [
  {
    name: 'Personal Details',
    route: 'PersonalDetails',
  },
  {
    name: 'Notifications',
    route: 'Notifications',
  },
  {
    name: 'Messages',
    route: 'Messages',
  },
  {
    name: 'Adverts',
    route: 'Adverts',
  },
  {
    name: 'Feedbacks',
    route: 'Feedbacks',
  },
  {
    name: 'Change Password',
    route: 'ChangePassword',
  },
  {
    name: 'Premium Services',
  },
];

function SettingsScreen({navigation}) {
  const Toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header>
          <SellerDetail
            title={false}
            viewSellerBtn={false}
            sellerCount={true}
            isBlack={false}
            profile={data?.user?.profile}
            createdAt={data?.user?.createdAt}
            totalAdsCount={data?.user?.profile?.totalAds}
          />
        </Header>
        <VStack>
          {SettingRoutes.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => item.route ? navigation.navigate(item.route) : Toast.show({title: 'Coming Soon'})}>
              <HStack py={5} px={4}>
                <Text fontSize="md" mb={0.8} bold>
                  {item.name}
                </Text>
              </HStack>
              <Divider />
            </Pressable>
          ))}
        </VStack>
        <View pb={3} />
        <Center>
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            borderRadius={40}
            py={2.5}
            disabled={loading}
            width={width * 0.9}
            onPress={async () => {
              setLoading(true);
              GoogleSignin.configure({
                offlineAccess: true,
                // androidClientId: 'ADD_GOOGLE_ANDROID_CLIENT_ID_HERE',
                androidClientId: '884037126176-64g6b4o0c3go82m1k1lbfiigdl5o031j.apps.googleusercontent.com',
                // iosClientId: 'ADD_GOOGLE_iOS_CLIENT_ID_HERE',
                iosClientId: '884037126176-mvc5gvgqvi9l7i79plndlebnd5qkj5a0.apps.googleusercontent.com',
                // webClientId: 'YOUR_WEB_APPLICATION_CLIENT_ID_HERE',
                webClientId: '884037126176-a910honasuakja42u3h1nkt8dmfm4sn9.apps.googleusercontent.com',
              });
              async function signOut() {
                try {
                  await LoginManager.logOut();
                  await GoogleSignin.configure({
                    offlineAccess: true,
                    // androidClientId: 'ADD_GOOGLE_ANDROID_CLIENT_ID_HERE',
                    androidClientId: '884037126176-64g6b4o0c3go82m1k1lbfiigdl5o031j.apps.googleusercontent.com',
                    // iosClientId: 'ADD_GOOGLE_iOS_CLIENT_ID_HERE',
                    iosClientId: '884037126176-mvc5gvgqvi9l7i79plndlebnd5qkj5a0.apps.googleusercontent.com',
                    // webClientId: 'YOUR_WEB_APPLICATION_CLIENT_ID_HERE',
                    webClientId: '884037126176-a910honasuakja42u3h1nkt8dmfm4sn9.apps.googleusercontent.com',
                  });
                  await GoogleSignin.signOut();
                  await queryClient.clear();
                  await Utils.clearAll();
                  await Utils.setStringValue('Onboard', 'done');
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'Home' },
                      ],
                    })
                  )
                } catch (error) {
                  console.log(error)
                }
              }
              signOut();
            }}>
            Log Out
          </Button>
        </Center>
        <View py={5} />
      </VStack>
    </ScrollView>
  );
}

export default requireAuth(SettingsScreen);
