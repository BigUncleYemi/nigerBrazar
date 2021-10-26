import React from 'react';
import {VStack, Input, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {debounce} from 'lodash';
import memoize from 'fast-memoize';

export default function SearchBar(props) {
  const [value, setValue] = React.useState('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handler = React.useCallback(
    memoize(debounce(val => props.onSearchText(val), 2000)),
    [],
  );

  const handleChange = text => {
    setValue(text);
    if (props.onSearchText) {
      handler(text);
    }
  };
  return (
    <VStack width="100%" space={2}>
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        bg="white"
        borderRadius={5}
        value={value}
        onChangeText={handleChange}
        py={3}
        px={3}
        onTe
        InputLeftElement={
          <Icon
            size="sm"
            ml={2}
            color="gray.400"
            as={<Ionicons name="ios-search" />}
          />
        }
      />
    </VStack>
  );
}
