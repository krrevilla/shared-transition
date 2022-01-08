import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import ListScreen from './src/containers/ListScreen';
import DetailScreen from './src/containers/DetailScreen';

const Stack = createSharedElementStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen options={{ headerMode: 'none' }} name="List" component={ListScreen} />
          <Stack.Screen
            options={{ headerMode: 'none' }}
            name="Detail"
            component={DetailScreen}
            sharedElements={(route) => {
              return [
                {
                  id: `item.${route.params.item.id}.image`,
                  animation: 'move',
                  resize: 'clip',
                },
                {
                  id: `item.${route.params.item.id}.name`,
                  animation: 'fade-in',
                  resize: 'clip',
                },
              ];
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default gestureHandlerRootHOC(App);
