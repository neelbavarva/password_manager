import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, ImageBackground, BackHandler} from 'react-native';
const { width, height } = Dimensions.get("window");

export default function CardScreen({route, navigation}){

    const {_id, _bankName, _cardName, _number, _validTill, _cvv, _visa} = route.params;

    const[validTill, setValidTill] = useState(null)
    const[cvv, setCVV] = useState(null)
    const[key, setKey] = useState(null)
    const[validKey, setValidKey] = useState(false)

    useEffect(()=>{
        setValidTill(_validTill)
        setCVV(_cvv)

        const backAction = () => {
            clearData()
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();
    },[])

    function clearData(){
        setKey(null)
        setValidKey(false)
        setValidTill(_validTill)
        setCVV(_cvv)
    }

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
                </View>

                <View style={{paddingHorizontal: 25, paddingBottom: 25}}>
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>{_bankName} Card Info</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>enter key to decrypt card details</Text>
                </View>
            </View>
        )
    }
    
    function renderCard(){
        return(
            <View style={{display: 'flex', flex: 1, alignItems: 'center', marginTop: 20}}>
                <ImageBackground
                    source={_bankName.toLowerCase().includes("sbi") ? (_visa ? require('../assets/images/sbi_visa.png') : require('../assets/images/sbi_card.png'))
                    : _bankName.toLowerCase().includes("axis") ? (_visa ? require('../assets/images/axis_visa.png') : require('../assets/images/axis_card.png'))
                    : _bankName.toLowerCase().includes("hdfc") ? (_visa ? require('../assets/images/hdfc_visa.png') : require('../assets/images/hdfc_card.png'))
                    : _bankName.toLowerCase().includes("icici") ? (_visa ? require('../assets/images/icici_visa.png') : require('../assets/images/icici_card.png'))
                    : _bankName.toLowerCase().includes("iob") ? (_visa ? require('../assets/images/iob_visa.png') : require('../assets/images/iob_card.png'))
                    : _bankName.toLowerCase().includes("slice") ? (_visa ? require('../assets/images/slice_visa.png') : require('../assets/images/slice_card.png'))
                    : _visa ? require('../assets/images/other_visa.png') : require('../assets/images/other_card.png')}
                    style={{
                        width: 375,
                        height: 213
                    }}
                    imageStyle={{ borderRadius:8}}
                >
                    <Text style={{marginTop: 25, fontFamily: 'Gilroy-Bold', marginLeft: 20, fontSize: 12, color: 'white'}}>
                        {validKey ? (_number.substring(0,4) + " " + _number.substring(4,8) + " " + _number.substring(8,12) + " " + _number.substring(12)) : ("XXXX XXXX XXXX " + _number.substring(12))}
                    </Text>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 68, flex: 1, justifyContent: 'flex-end', marginHorizontal: 20, alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 12, color: 'white', marginRight: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 10, borderRadius: 5}}>Valid Till: {validTill.substring(1,3)} / {validTill.substring(3, 5)}</Text>
                        <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 12, color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 10, borderRadius: 5}}>CVV: {cvv.substring(1,4)}</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'flex-end', marginBottom: 20, marginLeft: 25}}>
                        <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 12, color: 'white'}}>
                            {_cardName}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    function decryptCard(){
        if(key!=null){
            let decrypted_string = "";
            let decrypted_key = "";
            let key_length = (key.length-1)*3 + 1;
        
            for(let i=0;i<validTill.length-key_length;i++){
                if((i+1)%3==0){
                    decrypted_string += String.fromCharCode(validTill.charAt(i).charCodeAt(0) - 4);
                }
            }
        
            for(let i=validTill.length-key_length;i<validTill.length;i++){
                if((i+1)%3==0){
                    decrypted_key += String.fromCharCode(validTill.charAt(i).charCodeAt(0) - 4);
                }
            }
        
            decrypted_key==key ? setValidTill(decrypted_string) : setValidTill("wrong_key")

            decrypted_string = "";
            decrypted_key = "";
            key_length = (key.length-1)*3 + 1;
        
            for(let i=0;i<cvv.length-key_length;i++){
                if((i+1)%3==0){
                    decrypted_string += String.fromCharCode(cvv.charAt(i).charCodeAt(0) - 4);
                }
            }
        
            for(let i=cvv.length-key_length;i<cvv.length;i++){
                if((i+1)%3==0){
                    decrypted_key += String.fromCharCode(cvv.charAt(i).charCodeAt(0) - 4);
                }
            }
        
            decrypted_key==key ? setCVV(decrypted_string)&setKey(null) : setCVV("wrong_key")

            cvv!="wrong_key"&&validTill!="wrong_key" ? setValidKey(true) : setValidKey(false)
        }
    }


    function renderDecrypt(){
        return(
            <View>
                <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, marginHorizontal: 20, marginTop: 40, marginBottom: -5, marginLeft: 20}}>decrypt your card</Text>
                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <TextInput 
                        style={{
                            width: width - 35,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            padding: 10,
                            paddingHorizontal: 20,
                            fontFamily: 'Gilroy-Medium',
                            marginTop: 15,
                            color: 'white',
                            borderRadius: 1
                        }}
                        value={key}
                        onChangeText={e => setKey(e)}
                        placeholder="key"
                        placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            backgroundColor: 'white',
                            width: width - 35,
                            padding: 15,
                            marginTop: 15,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1
                        }}
                        onPress={() => decryptCard()}
                    >
                        <Text style={{fontFamily: 'Gilroy-Bold', color: 'black'}}>decrypt</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderCardPage(){
        return(
            <View>
                {renderHeader()}
                {renderCard()}
                {renderDecrypt()}
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height, paddingBottom: 50}}>
            {validTill==null||cvv==null?null:renderCardPage()}
        </ScrollView>
    );
};
