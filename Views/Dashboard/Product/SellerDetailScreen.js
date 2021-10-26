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
import {useGetAllUserAds} from '../../../Hooks/useGetAds';

const width = Dimensions.get('screen').width;

const SellerDetailScreen = props => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const {profile, totalAdsCount, createdAt, id} = props.route.params;
  const UserApprovedAds = useGetAllUserAds({status: 'approved'}, id);
  
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header onPressAction={() => props.navigation.goBack()}>
          <SellerDetail
            title={false}
            viewSellerBtn={false}
            sellerCount={true}
            isBlack={false}
            profile={profile}
            totalAdsCount={totalAdsCount}
            createdAt={createdAt}
          />
        </Header>
        <VStack py={3} px={2.5}>
          <VStack py={2}>
            {UserApprovedAds?.data?.map((item, index) => (
              <ProductCard item={item} key={index} navigation={props.navigation} />
            ))}
          </VStack>
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
