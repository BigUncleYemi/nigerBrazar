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

export default function ProductListScreen(props) {
  const {subCategory} = props.route.params;
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header
          title={subCategory}
          onPressAction={() => props.navigation.goBack()}
          searchBarAction={text => console.log('yeis', text)}
        />
        <VStack py={3} px={2.5}>
          {['', '', '', '', '', ''].map((item, index) => (
            <ProductCard key={index} navigation={props.navigation} />
          ))}
        </VStack>
        <View pb={3} />
      </VStack>
    </ScrollView>
  );
}
