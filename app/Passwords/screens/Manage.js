import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
const { width, height } = Dimensions.get("window");

export default function Manage({navigation}){

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
                <View style={{backgroundColor: '#4623B0', width: 250, marginRight: 7.5}}>
                    <Image style={{width: 250, height: 250, marginTop: -175}} source={require('../assets/images/layers_light.png')} />
                    <View style={{padding: 20, marginTop: 10}}>
                        <Text style={{fontFamily: 'Cirka-Bold', fontSize: 18, color: '#E5FE40'}}>add new password</Text>
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, color: '#D2D2D2', marginTop: 10}}>check you passwords </Text>
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, color: '#D2D2D2', marginTop: 2.5}}>lets see what </Text>
                        <Image />
                    </View>
                    <View>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate("AddPassword")}
                        style={{
                            backgroundColor: 'white',
                            width: 150,
                            height: 50,
                            margin: 20,
                            marginBottom: 35,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1,
                            marginTop: 25
                        }}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: 'black'}}>add new</Text>
                            <Image style={{tintColor: 'black', width: 20, height: 7.5, marginLeft: 15}} source={require('../assets/icons/left_arrow.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor: '#A40246', width: 250, marginHorizontal: 7.5}}>
                    <Image style={{width: 250, height: 250, marginTop: -175}} source={require('../assets/images/layers_light.png')} />
                    <View style={{padding: 20, marginTop: 10}}>
                        <Text style={{fontFamily: 'Cirka-Bold', fontSize: 18, color: '#E5FE40'}}>add new card</Text>
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, color: '#D2D2D2', marginTop: 10}}>check you passwords</Text>
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, color: '#D2D2D2', marginTop: 2.5}}>lets see what </Text>
                        <Image />
                    </View>
                    <View>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate("AddCard")}
                        style={{
                            backgroundColor: 'white',
                            width: 150,
                            height: 50,
                            margin: 20,
                            marginBottom: 35,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1,
                            marginTop: 25
                        }}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: 'black'}}>add new</Text>
                            <Image style={{tintColor: 'black', width: 20, height: 7.5, marginLeft: 15}} source={require('../assets/icons/left_arrow.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor: '#004298', width: 250, marginHorizontal: 7.5}}>
                    <Image style={{width: 250, height: 250, marginTop: -175}} source={require('../assets/images/layers_light.png')} />
                    <View style={{padding: 20, marginTop: 10}}>
                        <Text style={{fontFamily: 'Cirka-Bold', fontSize: 18, color: '#E5FE40'}}>delete passwords</Text>
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, color: '#D2D2D2', marginTop: 10}}>check you passwords</Text>
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, color: '#D2D2D2', marginTop: 2.5}}>lets see what </Text>
                        <Image />
                    </View>
                    <View>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate("DeletePassword")}
                        style={{
                            backgroundColor: 'white',
                            width: 150,
                            height: 50,
                            margin: 20,
                            marginBottom: 35,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1,
                            marginTop: 25
                        }}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: 'black'}}>delete</Text>
                            <Image style={{tintColor: 'black', width: 20, height: 7.5, marginLeft: 15}} source={require('../assets/icons/left_arrow.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor: '#393838', width: 250, marginLeft: 7.5}}>
                    <Image style={{width: 250, height: 250, marginTop: -175}} source={require('../assets/images/layers_light.png')} />
                    <View style={{padding: 20, marginTop: 10}}>
                        <Text style={{fontFamily: 'Cirka-Bold', fontSize: 18, color: '#E5FE40'}}>delete cards</Text>
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, color: '#D2D2D2', marginTop: 10}}>check you passwords</Text>
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, color: '#D2D2D2', marginTop: 2.5}}>lets see what </Text>
                        <Image />
                    </View>
                    <View>
                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            width: 150,
                            height: 50,
                            margin: 20,
                            marginBottom: 35,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1,
                            marginTop: 25
                        }}>
                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: 'black'}}>delete</Text>
                            <Image style={{tintColor: 'black', width: 20, height: 7.5, marginLeft: 15}} source={require('../assets/icons/left_arrow.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }

    function renderAddKey(){
        return(
            <View style={{display: 'flex', flexDirection: 'row', margin: 20, backgroundColor: '#6A35FF', padding: 20}}>
                <View style={{display: 'flex', flex: 1}}>
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 18, fontFamily: 'Gilroy-Bold', color: 'white'}}>add local key</Text>
                        <Text style={{fontSize: 14, fontFamily: 'Gilroy-Medium', color: '#B287FD', marginTop: 25, lineHeight: 20}}>add key to your local storage</Text>
                    </View>
                    <View style={{marginTop: 25, marginBottom: 10}}>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            style={{
                                backgroundColor: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 12.5
                            }}
                        >
                            <Text style={{fontSize: 14, fontFamily: 'Gilroy-Bold', color: 'black'}}>add new key</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Image style={{width: 125, height: 125}} source={require('../assets/icons/secure.png')} />
                </View>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height, paddingBottom: 50}}>
            {renderHeader()}
            {renderFeatures()}
            {renderAddKey()}
        </ScrollView>
    );
}