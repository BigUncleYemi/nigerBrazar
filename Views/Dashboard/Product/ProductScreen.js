/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Linking, Platform, StyleSheet, Dimensions} from 'react-native';
import {View, VStack, ScrollView, Button, Modal, HStack} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Text from '../../Components/Text';
import FormInput from '../../Components/Input';
import ProductCard from '../../Components/ProductCard';
import ImageCarosel from '../../Components/ImageCarosel';
import ProductDesc from '../../Components/ProductDesc';
import SellerDetail from '../../Components/SellerDetail';
import FeedbackPanel from '../../Components/FeedbackPanel';

const width = Dimensions.get('screen').width;

const schema = yup.object().shape({
  bid: yup.number().positive().required(),
});

export default function ProductScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const insets = useSafeAreaInsets();
  const [isCallOpen, setIsCallOpen] = React.useState(false);
  const onCallClose = () => setIsCallOpen(false);
  const [isOfferOpen, setIsOfferOpen] = React.useState(false);
  const onOfferClose = () => setIsOfferOpen(false);
  const dialCall = (number = '09058165478') => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  const sendOffer = data => {
    console.log(data);
    onOfferClose();
    navigation.navigate('FeedBack', {
      BigText: 'Offer Made',
      SmallText:
        'Your offer has been made and sent to  the seller. They will respond accordingly.',
      BtnText: 'Close',
      BtnActionLink: 'Product',
    });
  };
  return (
    <React.Fragment>
      <Modal isOpen={isOfferOpen} onClose={onOfferClose} motionPreset={'fade'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <VStack
              py={2}
              mt={3}
              style={{maxHeight: 300}}
              alignItems="center"
              justifyContent="center">
              <FormInput
                name="bid"
                label="Make An Offer (CFA)"
                rules={{required: 'Field is required', type: 'number'}}
                {...{control, errors}}
              />
              <VStack pt={4}>
                <Button
                  width={width * 0.6}
                  borderRadius={50}
                  bg="orange.500"
                  onPress={handleSubmit(sendOffer)}
                  _text={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Send Offer
                </Button>
              </VStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Modal isOpen={isCallOpen} onClose={onCallClose} motionPreset={'fade'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <VStack
              py={2}
              style={{maxHeight: 300}}
              alignItems="center"
              justifyContent="center">
              <Text pb={4} bold fontSize="lg">
                Disclaimer
              </Text>
              <Text fontSize="sm" bold style={{textAlign: 'center'}}>
                Do not pay in advance even for the delivery.{'\n'}Try to meet at
                a safe, public location.{'\n'}Check the item BEFORE you buy it.
                {'\n'}Pay only after collecting the item.
              </Text>
              <HStack mt={5} pt={4}>
                <Button
                  width={width * 0.6}
                  borderRadius={50}
                  bg="orange.500"
                  onPress={() => {
                    dialCall();
                    onCallClose();
                  }}
                  _text={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Call Seller
                </Button>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <ScrollView
        bounce={false}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{paddingTop: insets.top, paddingBottom: 15, marginBottom: 60}}>
        <VStack mb={3} style={style.ProductConc}>
          <ImageCarosel navigation={navigation} />
          <VStack p={3.5}>
            <ProductDesc />
            <SellerDetail navigation={navigation} />
            <VStack mb={2}>
              <FeedbackPanel />
            </VStack>
            <VStack>
              <Text bold fontSize="xl" py={0}>
                Related Product
              </Text>
              <VStack py={1}>
                {['', '', ''].map((item, index) => (
                  <ProductCard key={index} navigation={navigation} />
                ))}
              </VStack>
              <View pb={3} />
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
      <Button.Group
        variant="solid"
        isAttached
        style={style.ProductBottomActionConc}>
        <Button
          borderRadius={0}
          width={width / 2}
          pb={5}
          colorScheme="orange"
          style={style.ProductBottomActionBtn}
          onPress={() => setIsCallOpen(true)}
          _text={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          Call
        </Button>
        <Button
          borderRadius={0}
          width={width / 2}
          pb={5}
          colorScheme="orange"
          style={style.ProductBottomActionBtn}
          onPress={() => setIsOfferOpen(true)}
          _text={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          Make An Offer
        </Button>
      </Button.Group>
    </React.Fragment>
  );
}

const style = StyleSheet.create({
  img: {
    width: width,
    height: width * 0.75,
  },
  ProductBottomActionConc: {position: 'absolute', bottom: 0, width},
  ProductBottomActionBtn: {borderColor: 'white', borderWidth: 1},
});
