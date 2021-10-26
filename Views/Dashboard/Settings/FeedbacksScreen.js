/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Box, View, VStack, Button, ScrollView, Divider} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormTextArea from '../../Components/TextArea';
import Header from '../../Components/Header';
import Text from '../../Components/Text';
import usePostFeedBackReply, {
  useGetAllUserFeedback,
} from '../../../Hooks/useFeedback';

const width = Dimensions.get('screen').width;

const schema = yup.object().shape({
  reply: yup.string().required(),
});

export default function FeedbacksScreen({navigation}) {
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
  const userFeedBack = useGetAllUserFeedback();
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header title={'Feedbacks'} onPressAction={() => navigation.goBack()} />
        <VStack py={3} px={2.5}>
          <VStack py={2}>
            {userFeedBack?.data?.map((item, index) => (
              <Box
                px={3}
                py={5}
                my={2}
                bg="white"
                shadow={1}
                borderRadius={8}
                key={index}>
                <Text bold fontSize="sm" mb={1}>
                  {item?.user?.profile?.lastName}{' '}
                  {item?.user?.profile?.firstName}
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
                ) : (
                  <React.Fragment>
                    <Divider mt={4} />
                    <VStack mt={3}>
                      <FormTextArea
                        name="reply"
                        label="Send Reply"
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
                        mb={2}
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
                  </React.Fragment>
                )}
              </Box>
            ))}
          </VStack>
        </VStack>
        <View pb={3} />
      </VStack>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  img: {
    width: width,
    height: width * 0.75,
  },
  tabsContainerStyle: {
    borderRadius: 30,
    borderColor: '#f97316',
  },
  tabStyle: {
    padding: 20,
    borderColor: '#f97316',
  },
  tabTextStyle: {
    color: '#f97316',
    fontWeight: 'bold',
  },
  activeTabStyle: {
    backgroundColor: '#f97316',
  },
});
