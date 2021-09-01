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

export default function ProductDesc() {
  return (
    <VStack>
      <HStack justifyContent="space-between">
        <Text style={{width: width * 0.75}} pt={2} fontSize="xl" bold>
          Chairs Delux Chairs Delux Chairs Delux Chairs Delux
        </Text>
        <IconButton
          variant="solid"
          icon={
            <Icon
              size="sm"
              as={<Ionicons name="heart-outline" />}
              color="black"
            />
          }
          backgroundColor="#EEEEEE"
          borderRadius={100}
          width={width * 0.13}
          shadow="sm"
          // onPress={() => navigation.goBack()}
        />
      </HStack>
      <HStack py={2} justifyContent="space-between" alignItems="center">
        <Text color="emerald.800" bold>
          NGN 250,000
        </Text>
        <Text color="orange.500" border px={2} py={1}>
          Promoted
        </Text>
      </HStack>
      <HStack>
        <Icon
          size="sm"
          as={<Ionicons name="map-outline" />}
          color="gray.500"
          mx={1}
        />
        <Text color="gray.500" bold>
          Ojo, Lagos State.
        </Text>
      </HStack>
      <HStack py={2}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget cursus
          viverra suspendisse morbi sed. In sit euismod porttitor neque, et
          adipiscing lobortis leo eu. Sapien aliquet pellentesque volutpat eget
          orci, congue felis mauris mattis. Purus arcu interdum a laoreet
          pulvinar at sit.
        </Text>
      </HStack>
    </VStack>
  );
}
