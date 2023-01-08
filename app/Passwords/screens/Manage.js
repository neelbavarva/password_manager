import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, AsyncStorage, ToastAndroid} from 'react-native';
const { width, height } = Dimensions.get("window");

export default function Manage({navigation}){

    const[key, setKey] = useState(null)
    const[enableAdd, setEnableAdd] = useState(false)

    const handleEnableAdd = () => {
        enableAdd?setEnableAdd(false)&setKey(null):setEnableAdd(true)
    }

    _storeKey = async () => {
        if(key!=null && key!=""){
            try {
                await AsyncStorage.setItem(
                  'localKey', key
                )
                setEnableAdd(false)
                setKey(null)
                ToastAndroid.show("Key added successfully", ToastAndroid.SHORT)
            } catch (error) {
                ToastAndroid.show(`Error: ${error}`, ToastAndroid.SHORT)
            }
        }
    }

    function renderHeader(){
        return(
            <View>
                <View style={{display: 'flex', flexDirection: 'row', margin: 20, marginBottom: 40, height: 60}}>
                    <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Image 
                            source={require('../assets/icons/logo.png')}
                            style={{
                                width: 50,
                                height: 50,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 100
                            }}
                        />
                    </View>
                </View>

                <View style={{paddingHorizontal: 25, paddingBottom: 25}}>
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>manage your passwords</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>be careful while adding or deleting a password</Text>
                </View>
            </View>
        )
    }

    function renderFeatures(){
        return(
            <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{display: 'flex', flexDirection: 'row', marginTop: 10, marginHorizontal: 20}}>

                <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.navigate("AddPassword")} style={{backgroundColor: '#2A2A2A', padding: 25}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Text style={{color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Gilroy-Bold', fontSize: 18}}>add Password</Text>
                        <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: '#3F6FD9', marginLeft: 10}} />
                    </View>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 12, marginTop: 10}}>be carefull about input fields and key</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.navigate("AddCard")} style={{backgroundColor: '#2A2A2A', padding: 25, marginLeft: 10}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Text style={{color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Gilroy-Bold', fontSize: 18}}>add Card</Text>
                        <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: '#3F6FD9', marginLeft: 10}} />
                    </View>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 12, marginTop: 10}}>be carefull about input fields and key</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.navigate("DeletePassword")} style={{backgroundColor: '#2A2A2A', padding: 25, marginLeft: 10}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Text style={{color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Gilroy-Bold', fontSize: 18}}>delete Password</Text>
                        <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: '#FFCB45', marginLeft: 10}} />
                    </View>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 12, marginTop: 10}}>be carefull while deleteing any password</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.75} style={{backgroundColor: '#2A2A2A', padding: 25, marginLeft: 10}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Text style={{color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'Gilroy-Bold', fontSize: 18}}>delete Card</Text>
                        <View style={{width: 10, height: 10, borderRadius: 100, backgroundColor: '#FFCB45', marginLeft: 10}} />
                    </View>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 12, marginTop: 10}}>be carefull while deleteing any card</Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }

    function renderAddKey(){
        return(
            <View style={{margin: 20, backgroundColor: '#0D0D0D', padding: 20}}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{padding: 10}}>
                        <Image
                            style={{width: 100, height: 100}} 
                            source={require('../assets/icons/score.png')}
                        />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', marginLeft: 25, paddingVertical: 10}}>
                        <Text style={{color: '#EDFE79', fontFamily: 'Gilroy-Black', fontSize: 12}}>S E C U R E</Text>
                        <Text style={{color: '#D2D2D2', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 10}}>add key to local storage</Text>
                        {/* <Text style={{color: '#3D3D3D', fontFamily: 'Gilroy-Medium', fontSize: 12, marginTop: 10}}>last updated on 5 March</Text> */}
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                borderWidth: 1,
                                borderColor: 'white',
                                width: 100,
                                paddingVertical: 10,
                                borderRadius: 1,
                                backgroundColor: 'black'
                            }}
                            onPress={() => handleEnableAdd()}
                        >
                            <Text style={{color: 'white', fontFamily: 'Gilroy-Medium', fontSize: 12}}>{enableAdd?"Cancel":"Add Key"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {enableAdd ? 
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom: 10}}>
                    <TextInput 
                        style={{
                            display: 'flex',
                            flex: 1,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            backgroundColor: 'black',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            fontFamily: 'Gilroy-Bold',
                            color: 'white',
                            borderRadius: 1,
                            fontSize: 14
                        }}
                        value={key}
                        onChangeText={e => setKey(e)}
                        placeholder="add key"
                        placeholderTextColor='rgba(255, 255, 255, 0.3)'
                    />
                    <TouchableOpacity
                        onPress={() => _storeKey()}
                        activeOpacity={0.75}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            backgroundColor: 'black',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            fontFamily: 'Gilroy-Bold',
                            color: 'white',
                            borderRadius: 1,
                            fontSize: 14
                        }}
                    >
                        <Text style={{fontFamily: 'Gilroy-Bold', color: 'white'}}>add</Text>
                        <Image style={{width: 12, height: 7, marginLeft: 10}} source={require('../assets/icons/right_arrow_small.png')} />
                    </TouchableOpacity>
                </View> : null}
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height, paddingBottom: 50}}>
            {renderHeader()}
            {renderFeatures()}
            {renderAddKey()}
            <View style={{paddingBottom: 100}} />
        </ScrollView>
    );
}