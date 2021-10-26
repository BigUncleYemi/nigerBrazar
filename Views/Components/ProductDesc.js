/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {VStack, HStack, Icon, IconButton} from 'native-base';
import Text from './Text';

const width = Dimensions.get('screen').width;

export default function ProductDesc({data}) {
  return (
    <VStack>
      <HStack justifyContent="space-between">
        <Text style={{width: width * 0.75}} pt={2} fontSize="xl" bold>
          {data.name}
        </Text>
        <IconButton
          variant="ghost"
          icon={
            <Icon
              color="white"
              size="sm"
              as={<Ionicons name="heart-outline" />}
            />
          }
          borderRadius={100}
          width={width * 0.13}
          color="white"
          style={{
            height: width * 0.13,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            color: 'white',
          }}
          // onPress={() => navigation.goBack()}
        />
      </HStack>
      <HStack py={2} justifyContent="space-between" alignItems="center">
        <Text color="emerald.800" bold>
          {data?.price.currency} {data?.price.amount}
        </Text>
        {data?.boostInfo?.status && <Text color="orange.500" border px={2} py={1}>
          Promoted
        </Text>}
      </HStack>
      <HStack>
        <Icon
          size="sm"
          as={<Ionicons name="map-outline" />}
          color="gray.500"
          mx={1}
        />
        <Text color="gray.500" bold>
          {data?.address.city}, {data?.address.state}
        </Text>
      </HStack>
      <HStack py={2}>
        <Text>
          {data.description}
        </Text>
      </HStack>
    </VStack>
  );
}
