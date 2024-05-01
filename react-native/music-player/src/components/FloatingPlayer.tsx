import {unknownTrachUri} from '@/constants/images';
import {defaultStyles} from '@/styles';
import {StyleSheet, Text, TouchableOpacityComponent, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useActiveTrack} from 'react-native-track-player';

export default function FloatingPlayer() {
  const activeTrack = useActiveTrack();

  if (!activeTrack) return null;

  const displayedTrack = activeTrack;

  return (
    <TouchableOpacityComponent>
      <>
        <FastImage
          source={{uri: displayedTrack.artwork ?? unknownTrachUri}}
          style={styles.trackArtWorkImage}
        />
        <View style={styles.trackTitleContainer}>
          <Text style={styles.trackTitle}>{displayedTrack.title}</Text>
        </View>
        <View>
          <PlayPauseButton size={24} />
          <SkipToNextButton size={22} />
        </View>
      </>
    </TouchableOpacityComponent>
  );
}

const styles = StyleSheet.create({
  trackArtWorkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 10,
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
