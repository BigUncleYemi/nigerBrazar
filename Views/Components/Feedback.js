/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Box, CheckCircleIcon, Button} from 'native-base';
import {Dimensions} from 'react-native';
import Text from './Text';
import GeneralStyle from '../Styles/index';

const width = Dimensions.get('screen').width;

const FeedbackScreen = ({
  route,
  navigation,
  Icon = () => <CheckCircleIcon size="xl" color="emerald.500" />,
  showBtn = true,
  showIcon = true,
}) => {
  const {BigText, SmallText, BtnText, BtnActionLink} = route.params;
  const {t} = useTranslation();
  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
      {showIcon && <Icon />}
      {BigText && (
        <Text
          mt={3}
          px={4}
          style={[
            GeneralStyle.authH1Text,
            {
              marginTop: 20,
              fontSize: GeneralStyle.authH1Text.fontSize * 0.8,
              textAlign: 'center',
            },
          ]}>
          {t(BigText)}
        </Text>
      )}
      {SmallText && (
        <Text
          mt={2}
          bold
          px={4}
          style={[GeneralStyle.authLinkText, {textAlign: 'center'}]}>
          {t(SmallText)}
        </Text>
      )}
      {showBtn && (
        <Button
          onPress={() => navigation.navigate(BtnActionLink)}
          mt={12}
          colorScheme="orange"
          _text={{
            color: 'white',
            fontWeight: 'bold',
          }}
          style={{width: width * 0.6, borderRadius: 18}}>
          {t(BtnText)}
        </Button>
      )}
    </Box>
  );
};

export default FeedbackScreen;
