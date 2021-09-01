/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Box, View, VStack, ScrollView} from 'native-base';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Header from '../../Components/Header';
import ProductCard from '../../Components/ProductCard';
import SellerDetail from '../../Components/SellerDetail';
import Text from '../../Components/Text';

const width = Dimensions.get('screen').width;

const SellerDetailScreen = props => {
  const [currentTab, setCurrentTab] = React.useState(0);
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header onPressAction={() => props.navigation.goBack()}>
          <SellerDetail
            title={false}
            viewSellerBtn={false}
            sellerCount={true}
            isBlack={false}
          />
        </Header>
        <VStack py={3} px={2.5}>
          <SegmentedControlTab
            values={['Ads', 'Feedbacks']}
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
                <ProductCard key={index} navigation={props.navigation} />
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
        </VStack>
        <View pb={3} />
      </VStack>
    </ScrollView>
  );
};

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

export default SellerDetailScreen;
