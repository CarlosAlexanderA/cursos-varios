import {NavigationContainer} from '@react-navigation/native';
import Main from './src/components/Main';

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{title: 'Welcome'}}
    //     />
    //     <Stack.Screen name="Profile" component={ProfileScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
