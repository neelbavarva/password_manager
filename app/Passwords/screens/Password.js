import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");
import {API} from '../API'

export default function Password({route, navigation}){
    const { _id, _name, _email, _password, _category} = route.params;

    function renderPassword(){
        return(
            <View>
                <Image 
                    style={{marginTop: - 150, width: width, height: height/2.5}}
                    source={require('../assets/images/layers_background.png')}
                />

                {_category=="web-app" && 
                    <Image
                        style={{width: 150, height: 125, marginLeft: 25, marginTop: 50}}
                        source={require('../assets/icons/web_app_page.png')}
                    />
                }
                {_category=="email" && 
                    <Image
                        style={{width: 130, height: 100, marginLeft: 25, marginTop: 50}}
                        source={require('../assets/icons/email_page.png')}
                    />
                }
                {_category=="banking" && 
                    <Image
                        style={{width: 125, height: 125, marginLeft: 25, marginTop: 50}}
                        source={require('../assets/icons/banking_page.png')}
                    />
                }
                {_category=="other" && 
                    <Image
                        style={{width: 135, height: 100, marginLeft: 25, marginTop: 50}}
                        source={require('../assets/icons/other_page.png')}
                    />
                }

                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 40, marginHorizontal: 40}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Image
                            style={{width: 50, height: 105}}
                            source={require('../assets/icons/user_frame.png')}
                        />
                        <View style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{fontFamily:'Gilroy-Bold', fontSize: 16, color: 'white', marginLeft: 20, marginBottom: 15, marginTop: 10}}>{_name}</Text>
                            <Text style={{fontFamily:'Gilroy-Bold', fontSize: 16, marginLeft: 20, marginTop: 25}}>{_email}</Text>
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.75} onLongPress={() => copyToClipboard()} style={{paddingHorizontal: 10, marginTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingVertical: 20, paddingHorizontal: 10, paddingRight: 50}}>
                        <Image
                            style={{width: 50, height: 50, marginLeft: -10}}
                            source={require('../assets/icons/done_green.png')}
                        />
                        <Text style={{fontFamily:'Gilroy-Bold', fontSize: 14, marginLeft: 20, lineHeight: 16, color: 'grey', marginTop: 7}}>{_password.substring(1, _password.length-1)}</Text>
                    </TouchableOpacity>
                    <TextInput 
                        style={{
                            width: width - 80,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            padding: 10,
                            paddingHorizontal: 20,
                            fontFamily: 'Gilroy-Medium',
                            marginTop: 15,
                            color: 'white',
                            borderRadius: 1
                        }}
                        // value={_id}
                        // onChangeText={e => setKey(e)}
                        placeholder="key"
                        placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            backgroundColor: 'white',
                            width: width - 80,
                            padding: 15,
                            marginTop: 15,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1
                        }}
                        // onPress={() => decryptPassword()}
                    >
                        <Text style={{fontFamily: 'Gilroy-Bold', color: 'black'}}>decrypt</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height}}>
            {renderPassword()}
        </ScrollView>
    );
}