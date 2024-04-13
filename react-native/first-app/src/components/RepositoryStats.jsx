import React from 'react';
import {View} from 'react-native';
import StyledText from './StyledText';

const parserThousands = (value) => {
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
};

const RepositoryStats = (props) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <View style>
        <StyledText aling={'center'} fontWeight="bold">
          Stars:
        </StyledText>
        <StyledText aling={'center'}>
          {parserThousands(props.stargazersCount)}
        </StyledText>
      </View>
      <View>
        <StyledText aling={'center'} fontWeight="bold">
          Forks
        </StyledText>
        <StyledText aling={'center'}>
          {parserThousands(props.forksCount)}
        </StyledText>
      </View>
      <View>
        <StyledText aling={'center'} fontWeight="bold">
          Review
        </StyledText>
        <StyledText aling={'center'}> {props.reviewCount}</StyledText>
      </View>
      <View>
        <StyledText aling={'center'} fontWeight="bold">
          Rating
        </StyledText>
        <StyledText aling={'center'}>{props.ratingAverage}</StyledText>
      </View>
    </View>
  );
};

export default RepositoryStats;
