/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Box, View, VStack, ScrollView, useToast, Flex, FlatList, Pressable, HStack, Avatar, Spacer, Divider } from 'native-base';
import { useQuery } from 'react-query';
import Header from '../../Components/Header';
import Text from '../../Components/Text';
import Loader from '../../Components/Loader';
import moment from 'moment';
import ProductCard from '../../Components/ProductCard';
import Utils from '../../../utils';

export default function MessagesScreen({ navigation }) {
  const toast = useToast();
  const { data, isLoading, isError } = useQuery('CURRENT_USER', async () => {
    const res = await Utils.getMyObject('CURRENT_USER');
    return res;
  });
  const reData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Afreen Khan',
      timeStamp: '12:47 PM',
      recentText: 'Good Day!',
      avatarUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Sujita Mathur',
      timeStamp: '11:11 PM',
      recentText: 'Cheer up, there!',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Anci Barroco',
      timeStamp: '6:22 PM',
      recentText: 'Good Day!',
      avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      fullName: 'Aniket Kumar',
      timeStamp: '8:56 PM',
      recentText: 'All the best',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },
  ];

  // console.log(data.user.notifications, 'notifi')
  return (
    <View bg="white" flex={1}>
      {
        isLoading ? (
          <Loader />
        ) : (
          <VStack>
            <Header
              title={'Messages'}
              onPressAction={() => navigation.goBack()}
            />
            <ScrollView bounce={true}>
              <VStack py={3}>
                {
                  [...reData, ...reData, ...reData, ...reData].map((item, index) => (
                    <Box key={index}>
                      <Divider />
                      <Pressable py={2} onPress={() => console.log('You touched me')}>
                        <Box
                          pl="4"
                          pr="5"
                          py="2"
                        >
                          <HStack alignItems="center" space={3}>
                            <Avatar size="48px" source={{ uri: item.avatarUrl }} />
                            <VStack>
                              <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
                                {item.fullName}
                              </Text>
                              <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.recentText}</Text>
                            </VStack>
                            <Spacer />
                            <Text fontSize="xs" color="coolGray.800" _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
                              {item.timeStamp}
                            </Text>
                          </HStack>
                        </Box>
                      </Pressable>
                    </Box>
                  ))
                }
                {
                  data?.user && (
                    <Flex mt={20} justifyContent="center" alignItems="center">
                      <Text bold>
                        No Messages here yet.
                      </Text>
                    </Flex>
                  )
                }
                <View pb={3} />
                <View pb={3} />
              </VStack>
              <View pb={3} />
            </ScrollView>
            <View pb={3} />
          </VStack>
        )
      }
    </View>
  );
}
