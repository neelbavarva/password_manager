import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, Image, Dimensions, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
const { width, height } = Dimensions.get("window");
import {API} from './API'
import Main from './screens/ Main';
import Home from './screens/Home';
import Password from './screens/Password';

const Stack = createStackNavigator();

export default function App(){

    const[passwords, setPasswords] = useState(null)
    const[pin, setPin] = useState(null)

    const fetchPasswords = () => {
        fetch(`${API}/passwords/getNonBankingPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
        })
        .catch((e) => {
            setPasswords("network_error");
        })
    }

    useEffect(()=>{
        fetchPasswords()
    },[])

    const changePin = (e) => {
        if(e=="back"){
            let currPin = pin;
            currPin = currPin.substring(0,currPin.length-1);
            setPin(currPin)
        } else {
            if(pin.length<4){
                if(pin!=null){
                    let currPin = pin;
                    currPin = currPin.toString() + e.toString();
                    setPin(currPin)
                } else {
                    setPin(e.toString())
                }
            }
        }
    }

    const FadeInView = (props) => {
        const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
      
        useEffect(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }
            ).start();
        }, [fadeAnim])
      
        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}
            >
                {props.children}
            </Animated.View>
        );
    }

    function renderPasswordScreen(){
        return(
            <View style={{display: 'flex', height: height, backgroundColor: 'black'}}>
                <Image 
                    style={{marginTop: - 200, width: width, height: height/2}}
                    source={require('./assets/images/layers_background.png')}
                />
                <View style={{display: 'flex', flex: 1, alignItems: 'center', marginTop: -125}}>
                    <Image style={{
                        width: 100, 
                        height: 100, 
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 100
                    }} source={require('./assets/icons/logo.png')} />
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 20, marginTop: 20}}>Password Manager</Text>
                    <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 15, color: 'rgba(255, 255, 255, 0.25)'}}>Enter Your Pin To Continue With Your Passwords</Text>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 50}}>
                        <View style={{width: 20, height: 20, backgroundColor: pin!=null && pin.length>=1 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)', borderRadius: 100, marginHorizontal: 10}} />
                        <View style={{width: 20, height: 20, backgroundColor: pin!=null && pin.length>=2 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)', borderRadius: 100, marginHorizontal: 10}} />
                        <View style={{width: 20, height: 20, backgroundColor: pin!=null && pin.length>=3 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)', borderRadius: 100, marginHorizontal: 10}} />
                        <View style={{width: 20, height: 20, backgroundColor: pin!=null && pin.length>=4 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)', borderRadius: 100, marginHorizontal: 10}} />
                    </View>
                </View>
                <View style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => changePin("1")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changePin("2")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changePin("3")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center',  borderTopColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => changePin("4")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changePin("5")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changePin("6")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>6</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => changePin("7")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changePin("8")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changePin("9")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>9</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => changePin("back")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center',  borderTopColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changePin("0")} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log(pin)} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1}}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 16, padding: 20, color: 'grey'}}>Go</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <NavigationContainer>
            {passwords==null?
            <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
                <FadeInView>
                    <Image style={{
                        width: 125, 
                        height: 125, 
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 100
                    }} source={require('./assets/icons/logo.png')} />
                </FadeInView>
            </View>:
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
            </Stack.Navigator>}
            {/* {renderPasswordScreen()} */}
        </NavigationContainer>
    );
}