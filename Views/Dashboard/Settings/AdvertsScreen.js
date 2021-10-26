/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {View, VStack, ScrollView} from 'native-base';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Header from '../../Components/Header';
import ProductCard from '../../Components/ProductCard';
import {useGetAllUserAds} from '../../../Hooks/useGetAds';

const width = Dimensions.get('screen').width;

export default function AdvertsScreen({navigation}) {
  const [currentTab, setCurrentTab] = React.useState(0);
  const UserApprovedAds = useGetAllUserAds({status: 'approved'});
  const UserPendingAds = useGetAllUserAds({status: 'pending'});
  const UserRejectedAds = useGetAllUserAds({status: 'rejected'});
  return (
    <ScrollView bounce={false}>
      <VStack>
        <Header title={'Adverts'} onPressAction={() => navigation.goBack()} />
        <VStack py={3} px={2.5}>
          <SegmentedControlTab
            values={['Approved', 'Pending', 'Rejected']}
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
              {UserApprovedAds?.data?.map((item, index) => (
                <ProductCard
                  key={index}
                  link={'OwnerProduct'}
                  item={item}
                  navigation={navigation}
                />
              ))}
            </VStack>
          )}
          {currentTab === 1 && (
            <VStack py={2}>
              {UserPendingAds?.data?.map((item, index) => (
                <ProductCard
                  key={index}
                  link={'OwnerProduct'}
                  item={item}
                  navigation={navigation}
                />
              ))}
            </VStack>
          )}
          {currentTab === 2 && (
            <VStack py={2}>
              {UserRejectedAds?.data?.map((item, index) => (
                <ProductCard
                  key={index}
                  link={'OwnerProduct'}
                  item={item}
                  navigation={navigation}
                />
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
