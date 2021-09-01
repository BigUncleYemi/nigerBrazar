/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {VStack, HStack, Button} from 'native-base';
import Image from './Image';
import Text from './Text';

export default function SellerDetail({
  navigation,
  sellerCount = false,
  viewSellerBtn = true,
  title = true,
  isBlack = true,
}) {
  return (
    <VStack>
      {title && (
        <Text bold fontSize="xl" py={2}>
          Seller Details
        </Text>
      )}
      <HStack py={2}>
        <Image
          size={65}
          m={2}
          alt="Seller Avatar"
          style={
            isBlack
              ? {
                  borderWidth: 0,
                }
              : {
                  borderColor: 'white',
                  borderWidth: 2,
                }
          }
          borderRadius={100}
          source={{
            uri: 'https://wallpaperaccess.com/full/317501.jpg',
          }}
          fallbackSource={{
            uri: 'data:image/png;base64,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',
          }}
        />
        {isBlack ? (
          <VStack m={2}>
            <Text bold>Toheed Martins</Text>
            <Text bold>
              User since:{' '}
              <Text ml={2} color="gray.500">
                4years
              </Text>
            </Text>
            {!sellerCount ? (
              <Text bold>
                Last seen:{' '}
                <Text ml={2} color="gray.500">
                  Yesterday
                </Text>
              </Text>
            ) : (
              <Text bold>
                <Text ml={2} color="gray.500">
                  130
                </Text>{' '}
                Ads |{' '}
                <Text ml={2} color="gray.500">
                  130
                </Text>
                Feedback
              </Text>
            )}
          </VStack>
        ) : (
          <VStack m={2}>
            <Text fontSize="lg" bold color="white">
              Toheed Martins
            </Text>
            <Text bold color="white">
              User since:{' '}
              <Text ml={2} bold color="gray.100">
                4years
              </Text>
            </Text>
            {!sellerCount ? (
              <Text bold color="white">
                Last seen:{' '}
                <Text ml={2} color="gray.100">
                  Yesterday
                </Text>
              </Text>
            ) : (
              <Text bold color="white">
                <Text ml={2} bold color="gray.100">
                  130
                </Text>{' '}
                Ads |{' '}
                <Text ml={2} bold color="gray.100">
                  130
                </Text>{' '}
                Feedback
              </Text>
            )}
          </VStack>
        )}
      </HStack>
      {viewSellerBtn && (
        <Button
          mt={2}
          mb={5}
          colorScheme="orange"
          _text={{
            color: 'orange.100',
          }}
          onPress={() => navigation.navigate('SellerDetail')}
          borderRadius={15}>
          View All Sellers Ads
        </Button>
      )}
    </VStack>
  );
}
