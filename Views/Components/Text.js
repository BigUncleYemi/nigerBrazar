import React from 'react';
import {Text as NativeText} from 'native-base';

const Text = props => {
  return <NativeText {...props}>{props.children}</NativeText>;
};

export default Text;
