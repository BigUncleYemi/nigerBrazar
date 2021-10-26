import React from 'react';
import {StyleSheet, Dimensions, Animated} from 'react-native';
import {View, Icon, IconButton} from 'native-base';
import Image from './Image';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';

const {width} = Dimensions.get('screen');

const datas = [
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#7bcf6e',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#4654a7',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#7370cf',
  },
];

const ImageCarosel = ({data = datas, navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  const [activeIndex, setActiveIndex] = React.useState(0);
  let flatListRef = React.useRef(null);
  const onViewRef = React.useRef(({viewableItems}) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const options = {
    title: 'Product name',
    message: 'Product name',
  };
  const onShare = () => {
    Share.open(options)
      .then(res => {
        //console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const renderItem = React.useCallback(payload => {
    return (
      <View>
        <View py={2} px={3} shadow={2}>
          <Image
            alt="Product Image"
            source={{
              uri: payload.item.image,
            }}
            style={styles.Aimga}
            borderRadius={20}
          />
        </View>
      </View>
    );
  }, []);

  return (
    <View style={[styles.container]}>
      {navigation && (
        <View style={styles.leftActionBtn}>
          <IconButton
            variant="solid"
            _icon={{
              color: "orange.500",
              size: "md",
            }}
            icon={
              <Icon
                size="sm"
                as={<Ionicons name="arrow-back-sharp" />}
                color="black"
              />
            }
            backgroundColor="white"
            borderRadius={100}
            onPress={() => navigation.goBack()}
            p={2}
          />
        </View>
      )}
      <View style={styles.rightActionBtn}>
        <IconButton
          variant="solid"
          _icon={{
            color: "orange.500",
            size: "md",
          }}
          icon={
            <Icon
              size="sm"
              as={<Ionicons name="share-social" />}
              color="black"
            />
          }
          backgroundColor="white"
          borderRadius={100}
          p={2}
          onPress={onShare}
        />
      </View>
      <Animated.FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={data.map(item => ({image: item}))}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
      <ExpandingDot
        data={data}
        expandingDotWidth={15}
        scrollX={scrollX}
        inActiveDotOpacity={0.3}
        dotStyle={styles.EDot}
        activeDotColor={'#c2410c'}
        containerStyle={styles.EConc}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EDot: {
    width: 10,
    height: 10,
    backgroundColor: '#fdba74',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  EConc: {
    bottom: -20,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 20,
    fontWeight: '700',
  },
  buttonText: {
    color: '#fff',
  },
  Aimga: {
    width: width * 0.94,
    height: width * 0.8,
    backgroundColor: '#f5f5f5',
    minHeight: 200,
  },
  rightActionBtn: {
    position: 'absolute',
    zIndex: 2,
    top: 18,
    right: 18,
  },
  leftActionBtn: {
    position: 'absolute',
    zIndex: 2,
    top: 18,
    left: 18,
  },
});

export default ImageCarosel;
