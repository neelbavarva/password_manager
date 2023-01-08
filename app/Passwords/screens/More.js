import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView, Linking} from 'react-native';
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
                        <TouchableOpacity 
                        activeOpacity={0.75}
                        style={{
                            padding: 7.5,
                            borderRadius: 100,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)'
                        }}>
                            <Image 
                                source={require('../assets/icons/refresh.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 100
                                }}
                            />
                            <Text style={{color: '#8A8A8A', fontFamily: 'Gilroy-Bold', fontSize: 12, marginLeft: 12.5, marginRight: 7.5}}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{paddingHorizontal: 25, paddingBottom: 25}}>
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>more info</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>more information regarding the app</Text>
                </View>
            </View>
        )
    }

    function renderDetails(){
        return(
            <View style={{margin: 25}}>
                <View style={{marginVertical: 10, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#111111', paddingBottom: 20}}>
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#666666', width: 100, paddingLeft: 5}}>Name</Text>
                    <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 14, color: '#444444', marginLeft: 20}}>Password Manager</Text>
                </View>
                <View style={{marginVertical: 10, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#111111', paddingBottom: 20}}>
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#666666', width: 100, paddingLeft: 5}}>Version</Text>
                    <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 14, color: '#444444', marginLeft: 20}}>1.0.0</Text>
                </View>
                <View style={{marginVertical: 10, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#111111', paddingBottom: 20}}>
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#666666', width: 100, paddingLeft: 5}}>Mode</Text>
                    <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 14, color: '#444444', marginLeft: 20}}>Beta</Text>
                </View>
                <View style={{marginVertical: 10, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#111111', paddingBottom: 20}}>
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#666666', width: 100, paddingLeft: 5}}>Released</Text>
                    <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 14, color: '#444444', marginLeft: 20}}>--/--</Text>
                </View>
                <View style={{marginVertical: 10, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#111111', paddingBottom: 20}}>
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#666666', width: 100, paddingLeft: 5}}>Website</Text>
                    <TouchableOpacity 
                        onPress={() => {Linking.openURL("https://password-manager-web.vercel.app/")}}
                    >
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 14, color: '#444444', marginLeft: 20}}>Webview Link</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical: 10, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#111111', paddingBottom: 20}}>
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#666666', width: 100, paddingLeft: 5}}>Github</Text>
                    <TouchableOpacity 
                        onPress={() => {Linking.openURL("https://github.com/neelbavarva/Password_Manager")}}
                    >
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 14, color: '#444444', marginLeft: 20}}>Repo Link</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical: 10, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#111111', paddingBottom: 20}}>
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#666666', width: 100, paddingLeft: 5}}>App Owner</Text>
                    <TouchableOpacity 
                        onPress={() => {Linking.openURL("https://neelbavarva.tech")}}
                    >
                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 14, color: '#444444', marginLeft: 20}}>neelbavarva.tech</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height, paddingBottom: 50}}>
            {renderHeader()}
            {renderDetails()}
        </ScrollView>
    );
}