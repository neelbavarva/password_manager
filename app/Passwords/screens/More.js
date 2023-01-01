import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
const { width, height } = Dimensions.get("window");

export default function More(){

    function renderHeader(){
        return(
            <View>
                <View style={{display: 'flex', flexDirection: 'row', margin: 20, marginBottom: 40, height: 60}}>
                    <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <View
                            activeOpacity={0.5}
                            style={{marginLeft: 0}}
                        >
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
                    <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 0}}>
                        <TouchableOpacity activeOpacity={0.75}
                        style={{
                            padding: 7.5,
                            paddingHorizontal: 8.5,
                            borderRadius: 100,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)'
                        }}>
                            <Image 
                                source={require('../assets/icons/search-small.png')}
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 100
                                }}
                            />
                            <Text style={{color: '#8A8A8A', fontFamily: 'Gilroy-Bold', fontSize: 12, marginLeft: 12.5, marginRight: 7.5}}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{paddingHorizontal: 25, paddingBottom: 25}}>
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>more info</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>store your key locally for direct decryption</Text>
                </View>
            </View>
        )
    }

    function renderKey(){
        return(
            <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                borderRadius: 1,
                margin: 25,
                paddingHorizontal: 20
            }}>
                <Text>gg</Text>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height, paddingBottom: 50}}>
            {renderHeader()}
            {renderKey()}
        </ScrollView>
    );
}