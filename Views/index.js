/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNBootSplash from 'react-native-bootsplash';
import {useQuery, useQueryClient} from 'react-query';
import {useTranslation} from 'react-i18next';
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
import MessagesScreen from './Dashboard/Settings/MessagesScreen';
import AdvertsScreen from './Dashboard/Settings/AdvertsScreen';
import FeedbacksScreen from './Dashboard/Settings/FeedbacksScreen';
import NotificationsScreen from './Dashboard/Settings/NotificationsScreen';
import OwnerProductScreen from './Dashboard/Product/OwnerProductScreen';
import PersonalDetailsScreen from './Dashboard/Settings/PersonalDetailsScreen';
import FeedbackScreen from './Components/Feedback';
import Utils from '../utils';
import Loader from './Components/Loader';
import useGetCategories from '../Hooks/useGetCategories';
import AddUIScreen from './Dashboard/Add';
import useGetUser from '../Hooks/useGetUser';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();

const HomeScreens = () => {
  return (
    <HomeTab.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={({route}) => ({
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
      <HomeTab.Screen name="Add" component={AddUIScreen} headerMode="none" />
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
    <AuthStack.Navigator initialRouteName={'Login'}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
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

const Index = React.memo(() => {
  const [loader, setLoader] = React.useState(true);
  const [hasOnboarded, setHasOnboard] = React.useState(false);
  const {i18n} = useTranslation();
  const queryClient = useQueryClient();
  const {isLoadingCat = isLoading} = useGetCategories();
  const {data, isLoading} = useGetUser();
  React.useEffect(() => {
    if (data) {
      i18n.changeLanguage(data?.user?.profile?.language);
      queryClient.setQueryData('LANG', data?.user?.profile?.language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  React.useEffect(() => {
    async function isOnboarded() {
      const res = await Utils.getMyStringValue('Onboard');
      if (res) {
        setHasOnboard(res);
      }
      setLoader(false);
      return res;
    }
    isOnboarded();
  });
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {isLoadingCat || isLoading || loader ? (
        <Loader />
      ) : (
        <Stack.Navigator
          initialRouteName={hasOnboarded ? 'Home' : 'Onboarding'}>
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
            name="Messages"
            component={MessagesScreen}
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
      )}
    </NavigationContainer>
  );
});

export default Index;
