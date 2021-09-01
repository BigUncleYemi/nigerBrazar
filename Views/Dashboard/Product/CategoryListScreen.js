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

export default function CategoryItemListSreen(props) {
  const {Category} = props.route.params;
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header
          title={Category}
          onPressAction={() => props.navigation.goBack()}
          searchBarAction={text => console.log('yeis', text)}
        />
        <VStack py={3}>
          {['', '', '', '', '', ''].map((item, index) => (
            <ListItem
              key={index}
              onPressAction={() =>
                props.navigation.navigate('ProductList', {
                  subCategory: 'Housing',
                })
              }
            />
          ))}
        </VStack>
        <View pb={3} />
      </VStack>
    </ScrollView>
  );
}
