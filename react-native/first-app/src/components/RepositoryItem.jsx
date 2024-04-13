import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import StyledText from './StyledText.jsx';
import RepositoryStats from './RepositoryStats.jsx';
import theme from '../theme.js';

const RepositoryItemHeader = ({
  ownerAvatarUrl,
  fullname,
  description,
  language,
}) => (
  <View style={{flexDirection: 'row', paddingBottom: 2}}>
    <View style={{paddingRight: 10}}>
      <Image style={styles.image} source={{uri: ownerAvatarUrl}} />
    </View>
    <View style={{flex: 1}}>
      <StyledText fontSize={'subheading'} fontWeight={'bold'}>
        {fullname}
      </StyledText>
      <StyledText>{description}</StyledText>
      <StyledText style={styles.language}>{language}</StyledText>
    </View>
  </View>
);
const RepositoryItem = (props) => {
  return (
    <View key={props.id} style={styles.container}>
      <RepositoryItemHeader {...props} />

      <RepositoryStats {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  language: {
    padding: 4,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    marginVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
});
export default RepositoryItem;
