import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RespositoryList from './RespositoryList';
import {HomeScreen} from './HomeScreen';
import AppBar from './AppBar';

const Tab = createMaterialTopTabNavigator();

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
          component={HomeScreen}
          options={{tabBarLabel: 'Home'}}
        />
        <Tab.Screen name="list" component={RespositoryList} />
      </Tab.Navigator>
      {/* <RespositoryList /> */}
    </View>
  );
};

export default Main;
