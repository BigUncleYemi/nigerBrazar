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

function FavoriteScreen({navigation}) {
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header title={'Favourite'} />
        <VStack py={3} px={2.5}>
          {['', '', '', '', '', ''].map((item, index) => (
            <ProductCard key={index} navigation={navigation} />
          ))}
        </VStack>
        <View pb={3} />
      </VStack>
    </ScrollView>
  );
}

export default FavoriteScreen;
