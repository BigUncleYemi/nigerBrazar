import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Box, View, VStack} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GeneralStyle from '../../Styles/index';
import SearchBar from '../../Components/SeacrchBar';
import CategoryItem from '../../Components/CategoryItem';
import ProductCard from '../../Components/ProductCard';
import Text from '../../Components/Text';

const Cat = [
  {
    name: 'Vehicles',
  },
  {
    name: 'Jobs Offers & Request',
  },
  {
    name: 'Real estates',
  },
  {
    name: 'Electronics & Computers',
  },
  {
    name: 'Fashion & Beauty',
  },
  {
    name: 'Services',
  },
  {
    name: 'Materials & equipments',
  },
  {
    name: 'Animals',
  },
];

export default function HomeScreen({navigation}) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Box bg="orange.500" style={{paddingTop: insets.top}}>
          <VStack style={style.header}>
            <View mb={3}>
              <Text style={[GeneralStyle.authH1Text, style.textHeader]}>
                What are you looking for today?
              </Text>
            </View>
            <SearchBar onSearchText={text => console.log(text)} />
          </VStack>
        </Box>
        <View bg="white" style={style.catConc} py={3}>
          {Cat.map((item, index) => (
            <CategoryItem
              key={index}
              text={item.name}
              navigation={navigation}
            />
          ))}
        </View>
        <View my={2} px={2.5}>
          {['', '', '', '', ''].map((item, index) => (
            <ProductCard key={index} navigation={navigation} />
          ))}
        </View>
      </VStack>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  catConc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  textHeader: {
    marginTop: 20,
    fontSize: GeneralStyle.authH1Text.fontSize * 0.8,
    color: '#fff7ed',
  },
  header: {padding: 30},
});
