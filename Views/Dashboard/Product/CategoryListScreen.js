/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {View, VStack, ScrollView} from 'native-base';
import Header from '../../Components/Header';
import ListItem from '../../Components/ListItem';
import useGetSubCategories from '../../../Hooks/useGetSubCategories';
import Loader from '../../Components/Loader';
import {useQueryClient} from 'react-query';
import ProductCard from '../../Components/ProductCard';
import {useGetAllAdsByCategory} from '../../../Hooks/useGetAds';

export default function CategoryItemListSreen(props) {
  const {Category, id} = props.route.params;
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('CURRENT_USER');
  const {data, isLoading} = useGetSubCategories(id);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ads = useGetAllAdsByCategory(id);
  return (
    <ScrollView bounce={false}>
      {isLoading ? (
        <VStack my={10} justifyContent="center" alignItems="center" flex={1}>
          <Loader />
        </VStack>
      ) : (
        <VStack>
          <Header
            title={Category}
            onPressAction={() => props.navigation.goBack()}
            searchBarAction={text => console.log('yeis', text)}
          />
          <VStack py={3}>
            {data?.subCategories?.map((item, index) => (
              <ListItem
                key={index}
                text={item?.name[user?.user?.profile?.language || 'FR']}
                count={item?.count || 'N/A'}
                onPressAction={() =>
                  props.navigation.navigate('ProductList', {
                    subCategory:
                      item?.name[user?.user?.profile?.language || 'FR'],
                    id: item?._id,
                  })
                }
              />
            ))}
          </VStack>
          <VStack pb={3} px={2.5}>
            {ads?.data?.map((item, index) => (
              <ProductCard
                item={item}
                key={index}
                navigation={props.navigation}
              />
            ))}
          </VStack>
          <View pb={3} />
        </VStack>
      )}
    </ScrollView>
  );
}
