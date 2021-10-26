import React from 'react';
import {Text as NativeText} from 'native-base';
import {useTranslation} from 'react-i18next';

const Text = props => {
  const {t} = useTranslation();
  return props.init ? (
    <NativeText {...props} style={props.style}>
      {t(props.children)}
    </NativeText>
  ) : (
    <NativeText {...props} style={props.style}>
      {props.children}
    </NativeText>
  );
};

export default Text;
