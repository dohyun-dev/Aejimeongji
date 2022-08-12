import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useLayoutEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import MainHome from './src/screens/Home/MainHome';
import Initial from './src/screens/Initial';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
import RunningHome from './src/screens/Running/RunningHome';
import RunningInfo from './src/screens/Running/RunningInfo';
import RunningProfile from './src/screens/Running/RunningProfile';
import RunningFinish from './src/screens/Running/RunningFinish';
import RunningGeolocation from './src/screens/Running/RunningGeolocation';
import GuideHome from './src/screens/Guide/GuideHome';
import GuideCategory from './src/screens/Guide/GuideCategory';
import GuideDetail from './src/screens/Guide/GuideDetail';
import CalendarHome from './src/screens/Calendar/CalendarHome';
import TodoUpload from './src/screens/Calendar/TodoUpload';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

// 파일을 만들어서, 홈, 산책, 온보딩으로 전달한다.

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Initial" component={BottomTabNavigator} />
      {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
      <Stack.Screen name="RunningHome" component={RunningHome} />
      <Stack.Screen name="RunningInfo" component={RunningInfo} />
      <Stack.Screen name="RunningProfile" component={RunningProfile} />
      <Stack.Screen name="RunningFinish" component={RunningFinish} />
      <Stack.Screen name="RunningGeolocation" component={RunningGeolocation} />
      <Stack.Screen name="Home" component={MainHome} />

      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <Stack.Screen name="ProfileHome2" component={ProfileHomeScreen2} />

      <Stack.Screen name="ProfileChoice" component={ProfileChoiceScreen} />

      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Guide" component={GuideHome} />
      <Stack.Screen name="GuideCategory" component={GuideCategory} />
      <Stack.Screen name="GuideDetail" component={GuideDetail} />
      <Stack.Screen name="CalendarHome" component={CalendarHome} />
      <Stack.Screen name="TodoUpload" component={TodoUpload} />
      <Stack.Screen name="PlaceHome" component={PlaceHome} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerStyle: styles.profileHeader,
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'black'},
          headerTintColor: '#90560D',
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="PlaceCategory" component={PlaceCategory} />
        <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
        <Stack.Screen name="MyInfo" component={MyInfoScreen} />
      </Stack.Group>
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  // 자동 로그인 기능
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // useLayoutEffect(() => {
  //   const fetchToken = async () => {
  //     const storedToken = await AsyncStorage.getItem('token');
  //     if (storedToken) {
  //       await dispatch(authActions.authenticate({token: storedToken}));
  //       // member id불러오고
  //       const memberId = await getMemberId();
  //       // 강아지 ids를 불러옴
  //       const ids = await fetchDogs();
  //       if (ids) {
  //         await dispatch(profileActions.saveDogIds(ids));
  //       }
  //     }
  //   };
  //   fetchToken();
  // }, []);
  return (
    <NavigationContainer>
      {isAuthenticated && <AuthenticatedStack />}
      {!isAuthenticated && <AuthStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  return <Navigation />;
};

import store from './src/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {authActions} from './src/store/auth';
import AuthStack from './src/navigation/AuthStack';
import ProfileHomeScreen from './src/screens/Profile/ProfileHomeScreen';
import ProfileHomeScreen2 from './src/screens/Profile/ProfileHomeScreen2';
import ProfileChoiceScreen from './src/screens/Profile/ProfileChoiceScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {profileActions} from './src/store/profile';
import {getMemberId} from './src/utils/auth';
import {fetchDogs} from './src/utils/profile';
import ProfileEditScreen from './src/screens/Profile/ProfileEditScreen';
import MyInfoScreen from './src/screens/Profile/MyInfoScreen';
import PlaceHome from './src/screens/Place/PlaceHome';
import PlaceCategory from './src/screens/Place/PlaceCategory';
import PlaceDetail from './src/screens/Place/PlaceDetail';
import MyPage from './src/screens/Profile/MyPage';
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Root />
    </Provider>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: '#FBEDD3',
  },
});
