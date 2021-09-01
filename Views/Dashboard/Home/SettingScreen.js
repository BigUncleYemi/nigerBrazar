/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Dimensions} from 'react-native';
import Text from '../../Components/Text';
import {
  View,
  VStack,
  ScrollView,
  Divider,
  HStack,
  Pressable,
  Button,
  Center,
} from 'native-base';
import Header from '../../Components/Header';
import SellerDetail from '../../Components/SellerDetail';

const width = Dimensions.get('screen').width;

const SettingRoutes = [
  {
    name: 'Personal Details',
    route: 'PersonalDetails',
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
    name: 'Premium Services',
    route: 'PremiumServices',
  },
  {
    name: 'Notifications',
    route: 'Notifications',
  },
  {
    name: 'Saved',
    route: 'Saved',
  },
  {
    name: 'Change Password',
    route: 'ChangePassword',
  },
];

export default function SettingsScreen({navigation}) {
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header>
          <SellerDetail
            title={false}
            viewSellerBtn={false}
            sellerCount={true}
            isBlack={false}
          />
        </Header>
        <VStack>
          {SettingRoutes.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(item.route)}>
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
            width={width * 0.9}
            onPress={() => console.log('hello world')}>
            Log Out
          </Button>
        </Center>
        <View py={5} />
      </VStack>
    </ScrollView>
  );
}
