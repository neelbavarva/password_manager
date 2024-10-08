import React from "react";
import { View, Image, Text} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"

import Home from "../screens/Home";
import Notes from "../screens/Notes";
import Banking from "../screens/Banking";
import Manage from "../screens/Manage";
import More from "../screens/More";
import Password from "../screens/Password";
import Card from '../screens/Card'
import AddPassword from "../screens/AddPassword";
import AddCard from "../screens/AddCard";
import DeletePassword from "../screens/DeletePassword";
import DeleteCard from "../screens/DeleteCard";

const Tab = createBottomTabNavigator()

export default function Tabs() {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                drawUnderTabBar: false,
                tabBarStyle: {
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    borderTopColor: "transparent",
                    height: 85,
                    paddingHorizontal: 10
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon:({focused}) => ( 
                        <View 
                            style={{
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: null, 
                                padding: 10,
                                borderRadius: 100
                            }}
                        >
                            <Image
                                source={focused ? require('../assets/icons/home_selected.png') : require('../assets/icons/home_unselected.png')}
                                resizeMode="contain"
                                style={{
                                    width: focused ? 25 : 22.5,
                                    height: focused ? 25 : 22.5
                                }}
                            />
                            <Text style={{color: focused ? 'white' : '#8A8A8A', fontFamily: 'Gilroy-Medium', fontSize: 10, marginTop: 7.5}}>home</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Banking"
                component={Banking}
                options={{
                    headerShown: false,
                    tabBarIcon:({focused}) => ( 
                        <View 
                            style={{
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: null, 
                                padding: 10,
                                borderRadius: 100
                            }}
                        >
                            <Image
                                source={focused ? require('../assets/icons/card_selected.png') : require('../assets/icons/card_unselected.png')}
                                resizeMode="contain"
                                style={{
                                    width: focused ? 25 : 25,
                                    height: focused ? 25 : 25
                                }}
                            />
                            <Text style={{color: focused ? 'white' : '#8A8A8A', fontFamily: 'Gilroy-Medium', fontSize: 10, marginTop: 7.5}}>bank</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Manage"
                component={Manage}
                options={{
                    headerShown: false,
                    tabBarIcon:({focused}) => ( 
                        <View 
                            style={{
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: null, 
                                padding: 10,
                                borderRadius: 100
                            }}
                        >
                            <Image
                                source={focused ? require('../assets/icons/pawned_selected.png') : require('../assets/icons/pawned_unselected.png')}
                                resizeMode="contain"
                                style={{
                                    width: focused ? 25 : 25,
                                    height: focused ? 25 : 25
                                }}
                            />
                            <Text style={{color: focused ? 'white' : '#8A8A8A', fontFamily: 'Gilroy-Medium', fontSize: 10, marginTop: 7.5}}>manage</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Notes"
                component={Notes}
                options={{
                    headerShown: false,
                    tabBarIcon:({focused}) => ( 
                        <View 
                            style={{
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: null, 
                                padding: 10,
                                borderRadius: 100
                            }}
                        >
                            <Image
                                source={focused ? require('../assets/icons/manage_selected.png') : require('../assets/icons/manage_unselected.png')}
                                resizeMode="contain"
                                style={{
                                    width: focused ? 25 : 22.5,
                                    height: focused ? 25 : 22.5
                                }}
                            />
                            <Text style={{color: focused ? 'white' : '#8A8A8A', fontFamily: 'Gilroy-Medium', fontSize: 10, marginTop: 7.5}}>notes</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="More"
                component={More}
                options={{
                    headerShown: false,
                    tabBarIcon:({focused}) => ( 
                        <View 
                            style={{
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: null, 
                                padding: 10,
                                borderRadius: 100
                            }}
                        >
                            <Image
                                source={focused ? require('../assets/icons/more_selected.png') : require('../assets/icons/more_unselected.png')}
                                resizeMode="contain"
                                style={{
                                    width: focused ? 22.5 : 22.5,
                                    height: focused ? 22.5 : 22.5
                                }}
                            />
                            <Text style={{color: focused ? 'white' : '#8A8A8A', fontFamily: 'Gilroy-Medium', fontSize: 10, marginTop: 7.5}}>more</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Password"
                component={Password}
                options={() => ({
                    headerShown: false, tabBarItemStyle: { display: 'none'},
                    tabBarStyle: {
                      display: "none",
                    },
                    tabBarButton: () => null,
                })}
            />

            <Tab.Screen
                name="Card"
                component={Card}
                options={() => ({
                    headerShown: false, tabBarItemStyle: { display: 'none'},
                    tabBarStyle: {
                      display: "none",
                    },
                    tabBarButton: () => null,
                })}
            />

            <Tab.Screen
                name="AddPassword"
                component={AddPassword}
                options={() => ({
                    headerShown: false, tabBarItemStyle: { display: 'none'},
                    tabBarStyle: {
                      display: "none",
                    },
                    tabBarButton: () => null,
                })}
            />

            <Tab.Screen
                name="AddCard"
                component={AddCard}
                options={() => ({
                    headerShown: false, tabBarItemStyle: { display: 'none'},
                    tabBarStyle: {
                      display: "none",
                    },
                    tabBarButton: () => null,
                })}
            />

            <Tab.Screen
                name="DeletePassword"
                component={DeletePassword}
                options={() => ({
                    headerShown: false, tabBarItemStyle: { display: 'none'},
                    tabBarStyle: {
                      display: "none",
                    },
                    tabBarButton: () => null,
                })}
            />

            <Tab.Screen
                name="DeleteCard"
                component={DeleteCard}
                options={() => ({
                    headerShown: false, tabBarItemStyle: { display: 'none'},
                    tabBarStyle: {
                      display: "none",
                    },
                    tabBarButton: () => null,
                })}
            />
            
        </Tab.Navigator>
    )
}