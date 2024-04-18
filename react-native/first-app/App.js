import {NavigationContainer} from '@react-navigation/native';
import Main from './src/components/Main';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <Main />
      <StatusBar style='light' />
    </NavigationContainer>
  );
}
