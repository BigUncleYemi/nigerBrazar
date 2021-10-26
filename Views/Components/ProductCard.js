import React from 'react';
import {Box, HStack, Stack, IconButton, Icon, Pressable} from 'native-base';
import {Linking, Platform, Dimensions, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from './Text';
import Image from './Image';

const width = Dimensions.get('screen').width;

export default function ProductCard(props) {
  const dialCall = (number = '09058165478') => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <Box bg="white" shadow={2} rounded="sm" mx={0} my={2} py={2.5} px={3}>
      <HStack space={3} alignItems="flex-start">
        <Image
          source={{
            uri: props?.item?.images[0],
          }}
          alt={props?.item?.name}
          resizeMode="cover"
          height={'100%'}
          width={100}
          rounded="md"
          style={style.img}
        />
        <Stack style={style.textConc} space={1} p={[4, 4, 8]}>
          <Pressable
            onPress={() =>
              props.navigation.navigate(props.link ? props.link : 'Product', {
                productData: props?.item,
              })
            }>
            <Text bold style={style.productName} noOfLines={2}>
              {props?.item?.name}
            </Text>
          </Pressable>
          <Text bold style={style.productDesc} noOfLines={3}>
            {props?.item?.description}
          </Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="emerald.800" bold>
              {props?.item?.price.currency} {props?.item?.price.amount}
            </Text>
            <IconButton
              onPress={() => dialCall()}
              icon={<Icon size="xs" as={<Ionicons name="call" />} />}
            />
          </HStack>
        </Stack>
      </HStack>
    </Box>
  );
}

const style = StyleSheet.create({
  textConc: {
    width: width * 0.85 - 100,
  },
  img: {
    width: width - (width * 0.95 - 95),
  },
  productName: {
    fontSize: 15,
  },
  productDesc: {
    color: '#8F8F8F',
    fontSize: 13,
  },
});
