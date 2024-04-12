import React from 'react';
import Constants from 'expo-constants';
import {Text, View} from 'react-native';
import RespositoryList from './RespositoryList';

const Main = () => {
  return (
    <View style={{marginTop: Constants.statusBarHeight, flexGrow: 1}}>
      <RespositoryList />
    </View>
  );
};

export default Main;
