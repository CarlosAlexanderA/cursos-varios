import {StackScreenWithSearchBar} from '@/constants/layout';
import {defaultStyles} from '@/styles';
import {Stack} from 'expo-router';
import {View} from 'react-native';

export default function FavoritesScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: 'Favorites',
          }}
          // options={{
          //   headerLargeTitle: true,
          //   headerTitle: 'Favorites',
          //   statusBarStyle: 'light',
          //   statusBarTranslucent: true,
          //   headerStyle: {
          //     backgroundColor: '#000',
          //   },
          //   headerTitleStyle: {
          //     color: '#fff',
          //     fontSize: 32,
          //     fontWeight: '900',
          //   },
          // }}
        />
      </Stack>
    </View>
  );
}
