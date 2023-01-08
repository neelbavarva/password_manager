import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Clipboard, ToastAndroid, BackHandler} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");

export default function Password({route, navigation}){
    const { _id, _name, _email, _password, _category} = route.params;

    const[password, setPassword] = useState(null)
    const[key, setKey] = useState(null)

    useEffect(() => {
        const backAction = () => {
            setKey(null)
            setPassword(null)
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();
    }, []);

    const copyToClipboard = () => {
        Clipboard.setString(password)
        ToastAndroid.show("Copied to Clipboard", ToastAndroid.SHORT)
    }

    function decryptPassword(){
        console.log(key)
        if(key!=null){
            let decrypted_string = "";
            let decrypted_key = "";
            let key_length = (key.length-1)*3 + 1;
        
            for(let i=0;i<_password.length-key_length;i++){
                if((i+1)%3==0){
                    decrypted_string += String.fromCharCode(_password.charAt(i).charCodeAt(0) - 4);
                }
            }
        
            for(let i=_password.length-key_length;i<_password.length;i++){
                if((i+1)%3==0){
                    decrypted_key += String.fromCharCode(_password.charAt(i).charCodeAt(0) - 4);
                }
            }
        
            decrypted_key==key ? setPassword(decrypted_string)&setKey(null) : setPassword("wrong_key");
        }
    }

    function renderPassword(){
        return(
            <View>
                <Image 
                    style={{marginTop: - 150, width: width, height: height/2.5}}
                    source={require('../assets/images/layers_background.png')}
                />

                {_category=="web-app" && 
                    <Image
                        style={{width: 107.5, height: 90, marginLeft: 30, marginTop: 50}}
                        source={require('../assets/icons/web_app_page.png')}
                    />
                }
                {_category=="email" && 
                    <Image
                        style={{width: 100, height: 77.5, marginLeft: 35, marginTop: 50}}
                        source={require('../assets/icons/email_page.png')}
                    />
                }
                {_category=="banking" && 
                    <Image
                        style={{width: 90, height: 90, marginLeft: 35, marginTop: 50}}
                        source={require('../assets/icons/banking_page.png')}
                    />
                }
                {_category=="other" && 
                    <Image
                        style={{width: 100, height: 77.5, marginLeft: 35, marginTop: 50}}
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
                            <Text style={{fontFamily:'Gilroy-Bold', fontSize: 16, color: 'rgba(255, 255, 255, 0.75)', marginLeft: 20, marginTop: 25}}>{_email}</Text>
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.75} onLongPress={() => copyToClipboard()} style={{paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingVertical: 20, paddingHorizontal: 10, paddingRight: 50, marginTop: password!=null && password!="wrong_key" ? 0 : 10}}>
                        <Image
                            style={{
                                width: password!=null && password!="wrong_key" ? 40 : 30, 
                                height: password!=null && password!="wrong_key" ? 40 : 30, 
                                marginLeft: password!=null && password!="wrong_key" ? -5 : null
                            }}
                            source={password==null ? require('../assets/icons/box.png') : password=="wrong_key" ? require('../assets/icons/warning.png') : require('../assets/icons/done_green.png')}
                        />
                        <Text style={{fontFamily:'Gilroy-Bold', fontSize: 14, marginLeft: 30, lineHeight: 16, color: 'rgba(255, 255, 255, 0.5)', marginTop: 0}}>{password==null?_password.substring(0, 26):password=="wrong_key"?"Wrong Key":password}</Text>
                    </TouchableOpacity>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                        <TextInput 
                            style={{
                                display: 'flex',
                                padding: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                width: width - 80,
                                borderRadius: 1,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                fontFamily: 'Gilroy-Medium',
                                color: 'white',
                            }}
                            value={key}
                            onChangeText={e => setKey(e)}
                            placeholder="key"
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                            secureTextEntry={true}
                        />
                        <TouchableOpacity onPress={() => setKey(null) & setPassword(null)} activeOpacity={0.25} style={{justifyContent: 'center', marginLeft: -50, marginTop: 16, paddingHorizontal: 10}}>
                            <Image
                                style={{width: 20, height: 20}}
                                source={require('../assets/icons/cross.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            padding: 15,
                            marginTop: 20,
                            width: width - 80,
                            borderRadius: 1,
                        }}
                        onPress={() => decryptPassword()}
                    >
                        <Text style={{fontFamily: 'Gilroy-Bold', color: 'black', fontSize: 14}}>decrypt</Text>
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