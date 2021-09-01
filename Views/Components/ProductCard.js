import React from 'react';
import {Box, HStack, Stack, IconButton, Icon, Pressable} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from './Text';
import Image from './Image';

const width = Dimensions.get('screen').width;

export default function ProductCard(props) {
  return (
    <Box bg="white" shadow={2} rounded="sm" mx={0} my={2} py={2.5} px={3}>
      <HStack space={3} alignItems="flex-start">
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGZMj-YLVIKCIng7DOh4mQ7XFSrX7vHv7TCQ&usqp=CAU',
          }}
          alt="image base"
          resizeMode="cover"
          height={'100%'}
          width={100}
          rounded="md"
          style={style.img}
        />
        <Stack style={style.textConc} space={1} p={[4, 4, 8]}>
          <Pressable
            onPress={() =>
              props.navigation.navigate(props.link ? props.link : 'Product')
            }>
            <Text bold style={style.productName} noOfLines={2}>
              Product1 Product 1Product 1Product 1
            </Text>
          </Pressable>
          <Text bold style={style.productDesc} noOfLines={3}>
            Make it possible to perform all user actions via the API, including
            authentication
          </Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="emerald.800" bold>
              NGN 3000
            </Text>
            <IconButton
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
