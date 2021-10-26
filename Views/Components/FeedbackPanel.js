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
import usePostFeedBackReply, {usePostFeedBack} from '../../Hooks/useFeedback';

const schema = yup.object().shape({
  reply: yup.string().required(),
});

const schemaNu = yup.object().shape({
  message: yup.string().required(),
});

const AddFeedBack =() => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schemaNu),
  });
  const postFeedBack = usePostFeedBack();
  const onSubmit = React.useCallback(
    async data => {
      postFeedBack.mutate(data);
    },
    [postFeedBack],
  );
  return(
    <VStack mt={2}>
      <FormTextArea
        name="message"
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
        isLoading={postFeedBack.status === 'loading'}
        isDisabled={postFeedBack.status === 'loading'}
        isLoadingText={'Posting...'}
        borderRadius={15}>
        Submit Feedback
      </Button>
    </VStack>
  )
}

export default function FeedbackPanel({isNotOwner, data, name = 'Product Name'}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const postFeedBackReply = usePostFeedBackReply();
  const onSubmit = React.useCallback(
    async data => {
      postFeedBackReply.mutate(data);
    },
    [postFeedBackReply],
  );
  return (
    <React.Fragment>
      <Divider />
      <Text bold fontSize="xl" py={2}>
        Feedback {!isNotOwner && `for ${name}`}
      </Text>
      <Divider mb={2} />
      <ScrollView
        nestedScrollEnabled={true}
        mb={6}
        style={styles.feedBackHeight}>
        {data?.data?.map((item, ind) => (
          <React.Fragment key={ind}>
            <Text bold fontSize="sm" mb={1}>
              {item?.user?.profile?.lastName}{' '}{item?.user?.profile?.firstName}
            </Text>
            <Text>{item.message}</Text>
            {item.reply ? (
              <React.Fragment>
                <Text bold fontSize="sm" mt={3} mb={1}>
                  Reply from {item?.owner?.profile?.lastName}{' '}
                  {item?.owner?.profile?.firstName}
                </Text>
                <Text>{item.reply}</Text>
              </React.Fragment>
            ) : !isNotOwner && (
              <VStack mt={2}>
                <FormTextArea
                  name="reply"
                  label="Send Feedback"
                  rules={{required: 'Field is required', type: 'text'}}
                  {...{control, errors}}
                />
                <View style={{display: 'none'}} display="none">
                  <FormTextArea
                    name="id"
                    defaultValue={item?._id}
                    rules={{required: 'Field is required', type: 'text'}}
                    {...{control, errors}}
                  />
                </View>
                <Button
                  mt={2}
                  mb={5}
                  colorScheme="orange"
                  _text={{
                    color: 'orange.100',
                  }}
                  onPress={handleSubmit(onSubmit)}
                  isLoading={postFeedBackReply.status === 'loading'}
                  isDisabled={postFeedBackReply.status === 'loading'}
                  isLoadingText={'Posting...'}
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
        <AddFeedBack />
      )}
      <Divider />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  feedBackHeight: {
    maxHeight: 400,
  },
});
