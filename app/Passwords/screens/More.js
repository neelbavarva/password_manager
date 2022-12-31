import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
const { width, height } = Dimensions.get("window");

export default function More(){

    function renderHeader(){
        return(
            <View style={{marginTop: 20}}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{padding: 25}}>
                        <Text style={{color: 'white', fontFamily: 'SwearDisplay-BoldItalic', fontSize: 28}}>More Info</Text>
                        <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 12, marginTop: 10}}>more information regarding password manager</Text>
                    </View>
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