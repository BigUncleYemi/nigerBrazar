/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  View,
  VStack,
  ScrollView,
  Divider,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Button,
  Center,
  Select,
  CheckIcon,
} from 'native-base';
import PhoneInput from 'react-native-phone-number-input';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import * as ImagePicker from 'react-native-image-picker';
import GeneralStyle from './Styles/index';
import OnboardScreen from './onboarding';
import ChangePasswordScreen from './Auth/ChangePasswordScreen';
import {RegisterScreen} from './Auth/Register';
import {LoginScreen} from './Auth/Login';
import {ForgetPasswordScreen} from './Auth/ForgetPassword';
import HomeScreen from './Dashboard/Home/HomeScreen';
import CategoryItemListSreen from './Dashboard/Product/CategoryListScreen';
import ProductListScreen from './Dashboard/Product/ProductListScreen';
import FavoriteScreen from './Dashboard/Home/FavouriteScreen';
import ProductScreen from './Dashboard/Product/ProductScreen';
import SellerDetailScreen from './Dashboard/Product/SellerDetailScreen';
import SettingsScreen from './Dashboard/Home/SettingScreen';
import SavedScreen from './Dashboard/Settings/Saved';
import AdvertsScreen from './Dashboard/Settings/AdvertsScreen';
import FeedbacksScreen from './Dashboard/Settings/FeedbacksScreen';
import NotificationsScreen from './Dashboard/Settings/NotificationsScreen';
import OwnerProductScreen from './Dashboard/Product/OwnerProductScreen';
import PersonalDetailsScreen from './Dashboard/Settings/PersonalDetailsScreen';
import Text from './Components/Text';
import FeedbackScreen from './Components/Feedback';
import FormInput from './Components/Input';
import Image from './Components/Image';
import Header from './Components/Header';
import ListItem from './Components/ListItem';
import ProductCard from './Components/ProductCard';
import ImageCarosel from './Components/ImageCarosel';
import ProductDesc from './Components/ProductDesc';
import SellerDetail from './Components/SellerDetail';
import FeedbackPanel from './Components/FeedbackPanel';
import requireAuth from '../Hoc/requireAuth';

const width = Dimensions.get('screen').width;

const AddScreen = requireAuth(({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
});

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

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();

const HomeScreens = () => {
  return (
    <HomeTab.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart-sharp' : 'heart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarVisible: route.name === 'Add' ? false : true,
        keyboardHidesTabBar: true,
      })}
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#fff0db',
        style: {
          backgroundColor: '#f97316',
        },
      }}>
      <HomeTab.Screen name="Home" component={HomeScreen} headerMode="none" />
      <HomeTab.Screen name="Add" component={AddScreen} headerMode="none" />
      <HomeTab.Screen
        name="Favorite"
        component={FavoriteScreen}
        headerMode="none"
      />
      <HomeTab.Screen
        name="Settings"
        component={SettingsScreen}
        headerMode="none"
      />
    </HomeTab.Navigator>
  );
};

const AuthScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName={'Register'}>
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={FeedbackScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={true ? (false ? 'Auth' : 'Home') : 'Onboarding'}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={AuthScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={HomeScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Favorite"
          component={HomeScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={HomeScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Saved"
          component={SavedScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Adverts"
          component={AdvertsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Feedbacks"
          component={FeedbacksScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PersonalDetails"
          component={PersonalDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CategoryItemList"
          component={CategoryItemListSreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OwnerProduct"
          component={OwnerProductScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SellerDetail"
          component={SellerDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FeedBack"
          component={FeedbackScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
