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
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormTextArea from '../../Components/TextArea';
import Header from '../../Components/Header';
import Text from '../../Components/Text';

const width = Dimensions.get('screen').width;

const schema = yup.object().shape({
  review: yup.string().required(),
});

export default function FeedbacksScreen({navigation}) {
  const [currentTab, setCurrentTab] = React.useState(0);
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
    <ScrollView bounce={false}>
      <VStack>
        <Header title={'Feedbacks'} onPressAction={() => navigation.goBack()} />
        <VStack py={3} px={2.5}>
          <SegmentedControlTab
            values={['Replyed', 'Unreplyed']}
            selectedIndex={currentTab}
            onTabPress={setCurrentTab}
            tabStyle={style.tabStyle}
            tabsContainerStyle={style.tabsContainerStyle}
            tabTextStyle={style.tabTextStyle}
            activeTabStyle={style.activeTabStyle}
            activeTabTextStyle={style.activeTabTextStyle}
          />
          {currentTab === 0 && (
            <VStack py={2}>
              {['', '', '', '', '', ''].map((item, index) => (
                <Box
                  px={3}
                  py={5}
                  my={2}
                  bg="white"
                  shadow={1}
                  borderRadius={8}
                  key={index}>
                  <Text bold fontSize="sm" mb={1}>
                    Toheed Martins customer
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Elementum ullamcorper vel commodo, nibh quisque. Et
                    adipiscing at pretium sed cras id et.
                  </Text>
                  <Text bold fontSize="sm" mt={3} mb={1}>
                    Reply from Toheed Martins
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Elementum ullamcorper vel commodo, nibh quisque. Et
                    adipiscing at pretium sed cras id et.
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
          {currentTab === 1 && (
            <VStack py={2}>
              {['', '', '', '', '', ''].map((item, index) => (
                <Box
                  px={3}
                  py={5}
                  my={2}
                  bg="white"
                  shadow={1}
                  borderRadius={8}
                  key={index}>
                  <Text bold fontSize="sm" mb={1}>
                    Toheed Martins customer
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Elementum ullamcorper vel commodo, nibh quisque. Et
                    adipiscing at pretium sed cras id et.
                  </Text>
                  <Divider mt={4} />
                  <VStack mt={3}>
                    <FormTextArea
                      name="feedback"
                      label="Send Feedback"
                      rules={{required: 'Field is required', type: 'text'}}
                      {...{control, errors}}
                    />
                    <Button
                      mt={2}
                      mb={2}
                      colorScheme="orange"
                      _text={{
                        color: 'orange.100',
                      }}
                      onPress={handleSubmit(onSubmit)}
                      borderRadius={15}>
                      Submit Feedback
                    </Button>
                  </VStack>
                </Box>
              ))}
            </VStack>
          )}
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
