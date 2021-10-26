/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {Box, View, VStack} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GeneralStyle from '../../Styles/index';
import SearchBar from '../../Components/SeacrchBar';
import CategoryItem from '../../Components/CategoryItem';
import ProductCard from '../../Components/ProductCard';
import Text from '../../Components/Text';
import useGetCategories from '../../../Hooks/useGetCategories';
import Loader from '../../Components/Loader';
import {useQueryClient} from 'react-query';
import {useGetAllAds} from '../../../Hooks/useGetAds';

export default function HomeScreen({navigation}) {
  // This hook returns `true` if the screen is focused, `false` otherwise
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('CURRENT_USER');
  const insets = useSafeAreaInsets();
  const {data, isLoading} = useGetCategories();
  const allAds = useGetAllAds();
  const [isPullToRefreshEnabled, setIsPullToRefreshEnabled] =
    React.useState(false);

  const onRefresh = async () => {
    try {
      setIsPullToRefreshEnabled(true);
      const res = await queryClient.invalidateQueries([
        'CURRENT_USER',
        'Categories',
        'All_ADS',
      ]);
      console.log(res);
      setIsPullToRefreshEnabled(false);
    } catch (e) {
      console.log('error', e);
    }
  };
  return (
    <ScrollView
      bounces={true}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isPullToRefreshEnabled}
          onRefresh={onRefresh}
        />
      }>
      <VStack>
        <Box bg="orange.500" style={{paddingTop: insets.top}}>
          <VStack style={style.header}>
            <View mb={3}>
              <Text style={[GeneralStyle.authH1Text, style.textHeader]}>
                What are you looking for today?
              </Text>
            </View>
            <SearchBar onSearchText={text => console.log(text)} />
          </VStack>
        </Box>
        <View bg="white" style={style.catConc} py={3}>
          {data?.map((item, index) => (
            <CategoryItem
              key={index}
              text={item?.name[user?.user?.profile?.language || 'FR']}
              source={item?.imageUrl}
              navigation={navigation}
              id={item?._id}
            />
          ))}
          {isLoading && <Loader />}
        </View>
        <View my={2} px={2.5}>
          {allAds?.data?.map((item, index) => (
            <ProductCard key={index} item={item} navigation={navigation} />
          ))}
          {allAds?.isLoading && <Loader />}
        </View>
      </VStack>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  catConc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  textHeader: {
    marginTop: 20,
    fontSize: GeneralStyle.authH1Text.fontSize * 0.8,
    color: '#fff7ed',
    lineHeight: 45,
  },
  header: {padding: 30},
});
