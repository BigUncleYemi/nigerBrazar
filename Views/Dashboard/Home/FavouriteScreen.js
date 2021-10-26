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
import ProductCard from '../../Components/ProductCard';
import requireAuth from '../../../Hoc/requireAuth';
import Text from '../../Components/Text';

const EmptyState = () => (
  <View>
    <Text>yemih</Text>
  </View>
);

function FavoriteScreen({navigation}) {
  const load = ['', '', '', '', '', ''];
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header title={'Favourite'} />
        <VStack py={3} px={2.5}>
          {load.map((item, index) => (
            <ProductCard key={index} navigation={navigation} />
          ))}
          {load.length === 0 && (
            <EmptyState title="Opps! Nothing here yet :(" />
          )}
        </VStack>
        <View pb={3} />
      </VStack>
    </ScrollView>
  );
}

export default requireAuth(FavoriteScreen);
