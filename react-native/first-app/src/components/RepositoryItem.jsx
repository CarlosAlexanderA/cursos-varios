import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StyledText from './StyledText.jsx';

const RepositoryItem = (props) => {
  return (
    <View key={props.id} style={styles.container}>
      <StyledText fontSize={'subheading'} fontWeight={'bold'}>
        {props.fullname}
      </StyledText>
      <StyledText>{props.description}</StyledText>
      <StyledText>{props.language}</StyledText>
      <StyledText>Stars: {props.stargazersCount}</StyledText>
      <StyledText>Review: {props.forksCount}</StyledText>
      <StyledText>Rating: {props.ratingAverage}</StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
export default RepositoryItem;
