import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Main from './screens/ Main';
import Home from './screens/Home';
import Password from './screens/Password';

const Stack = createStackNavigator();

export default function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                headerShown: false
                }}
                initialRouteName={'Main'}
            >
                <Stack.Screen
                    name="Main"
                    component={Main}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="Password"
                    component={Password}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}