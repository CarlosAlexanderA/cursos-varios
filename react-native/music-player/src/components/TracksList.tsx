import {utilsStyles} from '@/styles';
import {FlatList, FlatListProps, View} from 'react-native';
import {TrackListItem} from './TrackListItem';

export type TracksListProps = Partial<FlatListProps<unknown>> & {
  tracks: any[];
};

const ItemDivider = () => (
  <View
    style={{...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60}}
  />
);

export function TracksList({tracks, ...flatlistProps}: TracksListProps) {
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{paddingTop: 10, paddingBottom: 120}}
      ListFooterComponent={ItemDivider}
      ItemSeparatorComponent={ItemDivider}
      renderItem={({item: track}) => {
        return <TrackListItem track={{...track, image: track.artwork}} />;
      }}
      {...flatlistProps}
    />
  );
}
