import {unknownTrachUri} from '@/constants/images';
import {utilsStyles} from '@/styles';
import {FlatList, FlatListProps, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer, {Track} from 'react-native-track-player';
import {TrackListItem} from './TrackListItem';

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[];
};

const ItemDivider = () => (
  <View
    style={{...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60}}
  />
);

export function TracksList({tracks, ...flatlistProps}: TracksListProps) {
  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  };
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{paddingTop: 10, paddingBottom: 120}}
      ListFooterComponent={ItemDivider}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>
          <FastImage
            source={{uri: unknownTrachUri, priority: FastImage.priority.normal}}
            style={utilsStyles.emptyContentImage}
          />
        </View>
      }
      renderItem={({item: track}) => {
        return (
          <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
        );
      }}
      {...flatlistProps}
    />
  );
}
