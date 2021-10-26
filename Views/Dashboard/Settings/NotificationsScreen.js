/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Box, View, VStack, ScrollView, useToast, Flex} from 'native-base';
import { useQuery, useQueryClient } from 'react-query';
import Header from '../../Components/Header';
import Text from '../../Components/Text';
import Loader from '../../Components/Loader';
import moment from 'moment';
import ProductCard from '../../Components/ProductCard';
import Utils from '../../../utils';

export default function NotificationsScreen({navigation}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('CURRENT_USER');
  const { data, isLoading, isError } = useQuery('CURRENT_USER', async () => {
    const res = await Utils.getMyObject('CURRENT_USER');
    return res;
  });
  // React.useEffect(() => {
  //   if (isError) {
  //     toast.show({
  //       title: 'Error occured while fetching'
  //     });
  //   }
  // }, [isError]);
  // console.log(data.user.notifications, 'notifi')
  return (
    <ScrollView bounce={false}>
      {
        isLoading ? (
          <Loader />
        ) : (
          <VStack>
            <Header
              title={'Notifications'}
              onPressAction={() => navigation.goBack()}
            />
            <VStack py={3} px={2.5}>
              {data?.user?.notifications?.map((item, index) => (
                <Box
                  px={3}
                  py={5}
                  my={2}
                  bg="white"
                  shadow={1}
                  borderRadius={8}
                  key={index}>
                  <Text bold fontSize="md" mb={1}>
                    {item?.title[user?.user?.profile?.language || 'FR']} -{' '}
                    <Text ml={2} bold fontSize="sm" color="gray.400">
                      {moment(item?.createdAt).format('YYYY.MM.DD')}
                    </Text>
                  </Text>
                  <Text lighter fontSize="sm">
                    {item?.message[user?.user?.profile?.language || 'FR']}
                  </Text>
                  {item?.adverts && <ProductCard item={item.adverts} />}
                </Box>
              ))}
              {
                data?.user?.notifications?.length === 0 && (
                  <Flex mt={20} justifyContent="center" alignItems="center">
                    <Text bold>
                      No Notification here yet.
                    </Text>
                  </Flex>
                )
              }
            </VStack>
            <View pb={3} />
          </VStack>
        )
      }
    </ScrollView>
  );
}
