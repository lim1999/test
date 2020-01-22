import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import BoreyListAll from './src/screens/Borey/BoreyListAll';
import BoreyListRecent from './src/screens/Borey/BoreyListRecent';
import BoreyDetail from './src/screens/Borey/BoreyDetail';
import BoreySynchronized from './src/screens/Borey/BoreySynchronized';
import AddBoreyScreen from './src/screens/Borey/BoreyAdd';
import UpdateBoreyScreen from './src/screens/Borey/BoreyUpdate';
import AddBoreyLocation from './src/screens/Borey/BoreyAddLocation';
import LoginScreen from './src/screens/Login/LoginScreen';
import RegisterScreen from './src/screens/Login/RegisterScreen';
import ForgotPasswordScreen from './src/screens/Login/ForgotPasswordScreen';

import UserDashboardScreen from './src/screens/User/UserDashboardScreen';
import UserChangePasswordScreen from './src/screens/User/UserChangePasswordScreen';
import UserUpdateInfoScreen from './src/screens/User/UserUpdateInfoScreen';

import DashboardScreen from './src/screens/Dashboard/DashboardScreen';
import PropertyAddLocationScreen from './src/screens/Property/PropertyAddLocationScreen';
import PropertyAddScreen from './src/screens/Property/PropertyAddScreen';
import PropertyListScreen from './src/screens/Property/PropertyListScreen';
import PropertyDetailScreen from './src/screens/Property/PropertyDetailScreen';
import PropertyEditScreen from './src/screens/Property/PropertyEditScreen';

import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SplashScreen from './src/screens/Splash/SplashScreen';
import PropertyMapListScreen from './src/screens/Property/PropertyMapListScreen';

const BoreyNavigator = createStackNavigator({
 
  DashboardScreen: { screen: DashboardScreen, },
  PropertyMapList:{screen:PropertyMapListScreen},
  LoginScreen: { screen: LoginScreen, },
  // RegisterScreen: { screen: RegisterScreen, },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen, },
  BoreyListAll: { screen: BoreyListAll, },
  BoreyListRecent: { screen: BoreyListRecent, },
  BoreyDetail: { screen: BoreyDetail, },
  BoreySynchronized: { screen: BoreySynchronized, },
  AddBorey: { screen: AddBoreyScreen, },
  AddBoreyLocation: { screen: AddBoreyLocation, },
  BoreyUpdate: { screen: UpdateBoreyScreen, },

  UserDashboard: { screen: UserDashboardScreen, },
  PropertyAddLocationScreen:{screen:PropertyAddLocationScreen},
  PropertyAddScreen: { screen: PropertyAddScreen, },
  PropertyListScreen: { screen: PropertyListScreen, },
  PropertyDetailScreen: { screen: PropertyDetailScreen, },
  PropertyEditScreen: { screen: PropertyEditScreen, },

  UserChangePassword: { screen: UserChangePasswordScreen, },
  UserUpdateInfo: { screen: UserUpdateInfoScreen, },

}); 


const MapNavigtor=createStackNavigator({
  PropertyMapList:{screen:PropertyMapListScreen},
});


const BottomNavigator=createBottomTabNavigator({
  
  Dashboard:{screen:BoreyNavigator,navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={25} color={tintColor} />
  )
  }
},
  Map:{screen:MapNavigtor,navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
    <Icon name="map" size={25} color={tintColor} />
  )
  }
},
  User:{screen:UserDashboardScreen,navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
    <Icon name="user-circle" size={25} color={tintColor} />
  )
  }
},
},{
  initialRouteName: 'Map'
});

const InitialNavigator = createSwitchNavigator({
  SplashScreen: SplashScreen,
  App: BottomNavigator,
});
export default createAppContainer(InitialNavigator);