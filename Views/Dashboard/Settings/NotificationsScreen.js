/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Box, View, VStack, ScrollView} from 'native-base';
import Header from '../../Components/Header';
import Text from '../../Components/Text';

export default function NotificationsScreen({navigation}) {
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header
          title={'Notifications'}
          onPressAction={() => navigation.goBack()}
        />
        <VStack py={3} px={2.5}>
          {['', '', '', '', '', ''].map((item, index) => (
            <Box
              px={3}
              py={5}
              my={2}
              bg="white"
              shadow={1}
              borderRadius={8}
              key={index}>
              <Text bold fontSize="md" mb={1}>
                Notification -{' '}
                <Text ml={2} bold fontSize="sm" color="gray.400">
                  2020.10.30
                </Text>
              </Text>
              <Text lighter fontSize="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Elementum ullamcorper vel commodo, nibh quisque. Et adipiscing
                at pretium sed cras id et.
              </Text>
            </Box>
          ))}
        </VStack>
        <View pb={3} />
      </VStack>
    </ScrollView>
  );
}
