/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { WelcomeScreen } from './src/components/pages/WelcomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthScreen } from './src/components/pages/AuthScreen';
import { MapScreen } from './src/components/pages/MapScreen';
import { DeckScreen } from './src/components/pages/DeckScreen';
import { SettingsScreen } from './src/components/pages/SettingsScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome"
        options={{
          title: 'Welcome',
          headerShown: false,
          // tabBarStyle: { display: 'none' },
        }}
        component={WelcomeScreen} />
      <Tab.Screen name="Auth"
        options={{
          title: 'Auth',
          headerShown: false,
          // tabBarStyle: { display: 'none' },
        }}
        component={AuthScreen} />
      <Tab.Screen name="Main"
        options={{
          title: 'Main',
          headerShown: false,
          // tabBarStyle: { display: 'none' },
        }}
        component={MainFlowNavigator} />
    </Tab.Navigator>
  );
}

function MainFlowNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map"
        options={{
          title: 'Map',
          headerShown: false,
          // tabBarStyle: { display: 'none' },
        }}
        component={MapScreen} />
      <Tab.Screen name="Deck"
        options={{
          title: 'Deck',
          // headerShown: false,
          // tabBarStyle: { display: 'none' },
        }}
        component={DeckScreen} />
      <Tab.Screen name="Review"
        options={{
          title: 'Review',
          headerShown: false,
          // tabBarStyle: { display: 'none' },
        }}
        component={ReviewFlowStackScreen} />
    </Tab.Navigator>
  );
}

const ReviewFlowStack = createNativeStackNavigator();

const ReviewFlowStackScreen = () => (
  <ReviewFlowStack.Navigator screenOptions={{ headerShown: true }}>
    <ReviewFlowStack.Screen
      name="Deck"
      component={DeckScreen}
    />
    <ReviewFlowStack.Screen
      name="Settings"
      component={SettingsScreen}
    />
  </ReviewFlowStack.Navigator>
);

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
