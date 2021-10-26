import React from 'react';
import Text from './Text';
import {VStack, HStack, Divider, Pressable} from 'native-base';

export default function ListItem(props) {
  return (
    <Pressable onPress={() => props.onPressAction()}>
      <HStack py={3} px={4}>
        <VStack>
          <Text fontSize="md" mb={0.8} bold>
            {props.text}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {props.count} ads
          </Text>
        </VStack>
      </HStack>
      <Divider />
    </Pressable>
  );
}
