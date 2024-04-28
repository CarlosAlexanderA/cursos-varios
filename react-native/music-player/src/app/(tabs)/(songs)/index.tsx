import {TracksList} from '@/components/TracksList';
import {defaultStyles} from '@/styles';
import Constants from 'expo-constants';
import {ScrollView, View} from 'react-native';
export default function SongsScreen() {
  return (
    <View
      style={(defaultStyles.container, {paddingTop: Constants.statusBarHeight})}
    >
      <ScrollView>
        <TracksList scrollEnabled={false} />
      </ScrollView>
    </View>
  );
}
