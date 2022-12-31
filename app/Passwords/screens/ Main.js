import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from '../navigation/tabs';

export default function Main ({ navigation }) {
    return (
        <NavigationContainer
            independent={true}
        >
            <Tabs/>
        </NavigationContainer>
    )
}