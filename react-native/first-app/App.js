import {NavigationContainer} from '@react-navigation/native';
import Main from './src/components/Main';
import { StatusBar } from 'expo-status-bar';

import {  ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient.js';

const client = createApolloClient()

export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Main />
      <StatusBar style='light' />
    </NavigationContainer>
    </ApolloProvider>
  );
}
 