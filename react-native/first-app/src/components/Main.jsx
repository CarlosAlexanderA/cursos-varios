import React from 'react';
import {View} from 'react-native';
import RespositoryList from './RespositoryList';
import AppBar from './AppBar';
import {NativeRouter, Route, Routes} from 'react-router-native';
const Main = () => {
  return (
    <View style={{flex: 1}}>
      <AppBar />
      <NativeRouter>
        <Routes>
          <Route path="/" element={<RespositoryList />} />
        </Routes>
      </NativeRouter>
      <RespositoryList />
    </View>
  );
};

export default Main;
