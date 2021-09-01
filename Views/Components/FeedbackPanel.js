/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView, Divider, Button, VStack} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Text from './Text';
import FormTextArea from './TextArea';

const schema = yup.object().shape({
  review: yup.string().required(),
});

export default function FeedbackPanel({isNotOwner = true}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <React.Fragment>
      <Divider />
      <Text bold fontSize="xl" py={2}>
        Feedback {!isNotOwner && 'Product Name'}
      </Text>
      <Divider mb={2} />
      <ScrollView
        nestedScrollEnabled={true}
        mb={6}
        style={styles.feedBackHeight}>
        {['', '', '', '', '', ''].map((item, ind) => (
          <React.Fragment key={ind}>
            <Text bold fontSize="sm" mb={1}>
              Toheed Martins customer
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
              ullamcorper vel commodo, nibh quisque. Et adipiscing at pretium
              sed cras id et.
            </Text>
            {isNotOwner ? (
              <React.Fragment>
                <Text bold fontSize="sm" mt={3} mb={1}>
                  Reply from Toheed Martins
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Elementum ullamcorper vel commodo, nibh quisque. Et adipiscing
                  at pretium sed cras id et.
                </Text>
              </React.Fragment>
            ) : (
              <VStack mt={2}>
                <FormTextArea
                  name="feedback"
                  label="Send Feedback"
                  rules={{required: 'Field is required', type: 'text'}}
                  {...{control, errors}}
                />
                <Button
                  mt={2}
                  mb={5}
                  colorScheme="orange"
                  _text={{
                    color: 'orange.100',
                  }}
                  onPress={handleSubmit(onSubmit)}
                  borderRadius={15}>
                  Submit Feedback
                </Button>
              </VStack>
            )}
            <Divider my={3} />
          </React.Fragment>
        ))}
      </ScrollView>
      <Divider />
      {isNotOwner && (
        <VStack mt={2}>
          <FormTextArea
            name="feedback"
            label="Send Feedback"
            rules={{required: 'Field is required', type: 'text'}}
            {...{control, errors}}
          />
          <Button
            mt={2}
            mb={5}
            colorScheme="orange"
            _text={{
              color: 'orange.100',
            }}
            onPress={handleSubmit(onSubmit)}
            borderRadius={15}>
            Submit Feedback
          </Button>
        </VStack>
      )}
      <Divider />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  feedBackHeight: {
    height: 400,
  },
});
