import React from 'react';
import {View} from 'native-base';
import Text from './Text';
import Image from './Image';
import {Dimensions, StyleSheet, Pressable} from 'react-native';

const width = Dimensions.get('screen').width;

export default function CategoryItem({
  text = '',
  source = require('../Asset/car.png'),
  navigation,
}) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('CategoryItemList', {
          Category: text,
        })
      }>
      <View style={style.conc} p={2}>
        <Image
          size={'sm'}
          resizeMode="contain"
          source={source}
          alt={text}
          style={{
            height: (width / 4.5) * 0.3,
          }}
        />
        <Text bold style={style.text} py={2}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  conc: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width / 4,
    height: width / 5,
  },
  text: {textAlign: 'center', fontSize: 11},
});
