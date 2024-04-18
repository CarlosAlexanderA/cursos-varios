import React from 'react';
import {Platform, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RespositoryList from './RespositoryList';
import AppBar from './AppBar';
import LoginPage from '../pages/Login';

const Tab = createMaterialTopTabNavigator();

//! renderizar segun el so del movil
// const AppBar = Platform.select({
//   ios: () => require('./IOSAppBar').default,
//   default: () => require('./AppBar').default,
// })();

const Main = () => {
  return (
    <View style={{flex: 1}}>
      <AppBar />
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: '#242424',
          tabBarLabelStyle: {fontSize: 12},
          tabBarIndicatorStyle: {backgroundColor: '#242424'},
        }}
      >
        <Tab.Screen
          name="home"
          component={RespositoryList}
          options={{tabBarLabel: 'Home'}}
        />
        <Tab.Screen name="sing in" component={LoginPage} />
      </Tab.Navigator>
    </View>
  );
};

export default Main;
