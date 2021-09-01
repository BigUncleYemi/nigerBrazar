/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  Box,
  View,
  Button,
  IconButton,
  Icon,
  ArrowForwardIcon,
} from 'native-base';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import GeneralStyle from '../Styles';
import Text from '../Components/Text';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const data = [
  {key: 1, val: '12%'},
  {key: 2, val: '-20%'},
  {key: 3, val: '-70%'},
];

function OnboardScreen({navigation}) {
  const {t} = useTranslation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  //Current item index of flatlist
  const [activeIndex, setActiveIndex] = React.useState(0);
  let flatListRef = React.useRef(null);
  const gotoNextPage = val => {
    flatListRef.current.scrollToIndex({
      index: val,
      animated: true,
    });
  };
  //Flatlist props that calculates current item index
  const onViewRef = React.useRef(({viewableItems}) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="flex-start">
      <View style={[StyleSheet.absoluteFillObject]}>
        {data.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const colorFade = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.View
              key={index}
              style={[StyleSheet.absoluteFillObject, {opacity: colorFade}]}>
              <Animated.View style={[Onboard.topCircle, {right: item.val}]} />
              <Animated.View style={[Onboard.bottomCircle, {left: item.val}]} />
            </Animated.View>
          );
        })}
      </View>
      <Animated.FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={data}
        horizontal
        pagingEnabled
        keyExtractor={keyExtractor}
        bounces={false}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => {
          return (
            <SafeAreaView
              style={{width, height, position: 'relative', overflow: 'hidden'}}>
              <View style={{padding: 26, width}}>
                <Text bold style={Onboard.h1Text}>
                  {t(`obPage${item.key}`)}
                </Text>
              </View>
              {item.key === 1 && (
                <IconButton
                  variant="solid"
                  icon={<ArrowForwardIcon color="white" />}
                  style={{
                    position: 'absolute',
                    bottom: 80,
                    left: '44%',
                    backgroundColor: '#361E3E',
                    borderRadius: 30,
                  }}
                  onPress={() => gotoNextPage(1)}
                />
              )}
              {item.key === 2 && (
                <IconButton
                  variant="solid"
                  icon={<ArrowForwardIcon color="white" />}
                  style={{
                    position: 'absolute',
                    bottom: 80,
                    left: '44%',
                    backgroundColor: '#361E3E',
                    borderRadius: 30,
                  }}
                  onPress={() => gotoNextPage(2)}
                />
              )}
              {item.key === 3 && (
                <Button
                  style={{
                    position: 'absolute',
                    bottom: 80,
                    borderRadius: 30,
                    fontSize: 28,
                    paddingLeft: 30,
                    paddingRight: 30,
                    fontWeight: 'bold',
                    backgroundColor: '#361E3E',
                    width: width * 0.85,
                    marginRight: width * 0.05,
                    marginLeft: width * 0.07,
                  }}
                  size="lg"
                  onPress={() => navigation.navigate('Home')}>
                  {t('continueHome')}
                </Button>
              )}
            </SafeAreaView>
          );
        }}
      />
      <ExpandingDot
        data={data}
        expandingDotWidth={30}
        scrollX={scrollX}
        inActiveDotOpacity={0.6}
        dotStyle={{
          width: 10,
          height: 10,
          backgroundColor: '#fdba74',
          borderRadius: 5,
          marginHorizontal: 5,
        }}
        activeDotColor={'#361E3E'}
        containerStyle={{
          top: Platform.OS === 'android' ? 280 : 350,
          left: '6%',
        }}
      />
    </Box>
  );
}

const Onboard = StyleSheet.create({
  topCircle: {
    ...GeneralStyle.nbBgGrey,
    ...GeneralStyle.circle,
    height: width * 1.5,
    width: width * 1.5,
    position: 'absolute',
    top: Platform.OS === 'android' ? -width / 1.3 : -width / 1.7,
  },
  bottomCircle: {
    ...GeneralStyle.nbBgDarkGrey,
    ...GeneralStyle.circle,
    height: width * 1.5,
    width: width * 1.5,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? -height / 2 : -height / 3,
  },
  h1Text: {
    fontSize: width * 0.11,
    fontWeight: 'bold',
    color: '#361E3E',
    marginTop: Platform.OS === 'android' ? 60 : 110,
  },
});

export default OnboardScreen;
