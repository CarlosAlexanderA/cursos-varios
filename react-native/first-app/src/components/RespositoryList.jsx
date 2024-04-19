import React from 'react';
// import repositories from '../data/repositories.js';
import {FlatList, Text} from 'react-native';
import RepositoryItem from './RepositoryItem.jsx';
import {useRepositories} from '../hooks/useRepositories.jsx';

function RespositoryList() {
  const {repositories} = useRepositories();
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={() => <Text> </Text>}
      renderItem={({item: repo}) => <RepositoryItem {...repo} />}
    />
  );
}

export default RespositoryList;
