import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainHome from '../screens/Home/MainHome';
import CalendarHome from '../screens/Calendar/CalendarHome';
import TodoUpload from '../screens/Calendar/TodoUpload';

import ProfileChoiceScreen from '../screens/Profile/ProfileChoiceScreen';
import ProfileHomeScreen from '../screens/Profile/ProfileHomeScreen';
import SplashScreen from './SplashScreen';
import WelcomeScreen from '../screens/Auth/WelcomScreen';
import ProfileEditScreen from '../screens/Profile/ProfileEditScreen';
import ProfileHomeScreen2 from '../screens/Profile/ProfileHomeScreen2';
import GuideCategory from '../screens/Guide/GuideCategory';
import GuideDetail from '../screens/Guide/GuideDetail';
import PlaceHome from '../screens/Place/PlaceHome';
import PlaceCategory from '../screens/Place/PlaceCategory';
import PlaceDetail from '../screens/Place/PlaceDetail';
import RunningHome from '../screens/Running/RunningHome';
import RunningInfo from '../screens/Running/RunningInfo';
import RunningProfile from '../screens/Running/RunningProfile';
import RunningFinish from '../screens/Running/RunningFinish';
import GuideHome from '../screens/Guide/GuideHome';
import RunningGeolocation from '../screens/Running/RunningGeolocation';
import MyPage from '../screens/Profile/MyPage';
import MyInfoScreen from '../screens/Profile/MyInfoScreen';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

// 강아지가 있는 경우, 없는 경우
//  있는 경우 => 프로필 선택
//  없는 경우 => 프로필 생성

const HomeStack = ({navigation}) => {
  const dogId = useSelector(state => state.profile.id);
  console.log(dogId !== '');

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={dogId !== '' ? 'Home' : 'ProfileChoice'}>
      <Stack.Screen name="ProfileChoice" component={ProfileChoiceScreen} />
      <Stack.Screen name="Home" component={MainHome} />
      <Stack.Screen name="CalendarHome" component={CalendarHome} />
      <Stack.Screen name="TodoUpload" component={TodoUpload} />
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="ProfileChange" component={ProfileEditScreen} />
      <Stack.Screen name="MyInfo" component={MyInfoScreen} />
      <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} />
      <Stack.Screen name="ProfileHome2" component={ProfileHomeScreen2} />
      <Stack.Screen
        name="PlaceHome"
        component={PlaceHome}
        // options={{unmountOnBlur: true}}
      />
      <Stack.Screen
        name="PlaceCategory"
        component={PlaceCategory}
        // options={{unmountOnBlur: true}}
      />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerStyle: styles.profileHeader,
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#90560D', fontFamily: '강원교육튼튼'},
          headerTintColor: '#90560D',
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="PlaceDetail"
          component={PlaceDetail}
          // options={{unmountOnBlur: true}}
        />
      </Stack.Group>
      <Stack.Screen name="RunningHome" component={RunningHome} />
      <Stack.Screen name="RunningInfo" component={RunningInfo} />
      <Stack.Screen name="RunningProfile" component={RunningProfile} />
      <Stack.Screen
        name="RunningFinish"
        component={RunningFinish}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen
        name="RunningGeolocation"
        component={RunningGeolocation}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen name="Guide" component={GuideHome} />
      <Stack.Screen name="GuideCategory" component={GuideCategory} />
      <Stack.Screen name="GuideDetail" component={GuideDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: '#FBEDD3',
  },
});
