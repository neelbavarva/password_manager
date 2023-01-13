import React, {useState, useEffect} from 'react';
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
const { width, height } = Dimensions.get("window");

export default function AddCard({navigation}){

    const[bankName, setBankName] = useState(null)
    const[cardName, setCardName] = useState(null)
    const[number, setNumber] = useState(null)
    const[valitTill, setValitTill] = useState(null)
    const[cvv, setCVV] = useState(null)
    const[key, setKey] = useState(null)
    const[visa, setVisa] = useState(false)

    const[bankFocus, setBankFocus] = useState(false)
    const[nameFocus, setNameFocus] = useState(false)
    const[numberFocus, setNumberFocus] = useState(false)
    const[validFocus, setValidFocus] = useState(false)
    const[cvvFocus, setCVVFocus] = useState(false)

    const[fieldError, setFieldError] = useState(null)

    const[loader, setLoader] = useState(false)

    const addNewCard = () => {
        if (bankName==null||cardName==null||number==null||valitTill==null||cvv==null||key==null){
            setFieldError(true)
        } else {
            setLoader(true)
            setFieldError(false)
            fetch(`https://password-manager-v2.herokuapp.com/cards`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "bankName": bankName.toUpperCase(),
                    "cardName": cardName.toUpperCase(),
                    "number": number,
                    "validTill": CryptoJS.AES.encrypt(JSON.stringify(valitTill), key).toString(),
                    "cvv": CryptoJS.AES.encrypt(JSON.stringify(cvv), key).toString(),
                    "visa": visa
                })

            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
                navigation.navigate('Feature')
            })
            .catch((e) => {
                setLoader(false)
                console.log("Error in POST card "+e);
            })
        }
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
                    <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <TouchableOpacity 
                        // onPress={() => renderBack()}
                        activeOpacity={0.75}
                        style={{
                            padding: 12.5,
                            borderRadius: 100,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)'
                        }}>
                            <Image 
                                source={require('../assets/icons/left_arrow_small.png')}
                                style={{
                                    width: 15,
                                    height: 10,
                                    marginLeft: 5
                                }}
                            />
                            <Text style={{color: '#8A8A8A', fontFamily: 'Gilroy-Bold', fontSize: 12, marginLeft: 12.5, marginRight: 7.5}}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{paddingHorizontal: 25, paddingBottom: 25}}>
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>add Card</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>check fields carefully before submitting</Text>
                </View>
            </View>
        )
    }

    function renderCard(){
        return(
            <View style={{margin: 20, backgroundColor: '#111111'}}>
                <Text style={{fontFamily: 'Gilroy-Bold', color: '#222222', marginLeft: 25, marginTop: 30, fontSize: 14, marginBottom: 10}}>Card Details</Text>
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                    <TextInput 
                        style={{
                            width: width/2.7,
                            borderBottomWidth: 1,
                            borderColor: bankFocus ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            padding: 5,
                            paddingHorizontal: 20,
                            fontFamily: 'Gilroy-Medium',
                            marginTop: 15,
                            color: 'white',
                            borderRadius: 1,
                            fontSize: 12,
                            marginLeft: 20
                        }}
                        onBlur={() => setBankFocus(false)}
                        onFocus={() => setBankFocus(true)}
                        value={bankName}
                        onChangeText={e => setBankName(e)}
                        placeholder="bank"
                        placeholderTextColor='rgba(255, 255, 255, 0.3)'
                    />
                    <View style={{display: 'flex', flex: 1, alignItems: 'flex-end'}}>
                        <TextInput 
                            style={{
                                width: width/2.7,
                                borderBottomWidth: 1,
                                borderColor: nameFocus ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                fontFamily: 'Gilroy-Medium',
                                marginTop: 15,
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 12,
                                marginRight: 20
                            }}
                            onBlur={() => setNameFocus(false)}
                            onFocus={() => setNameFocus(true)}
                            value={cardName}
                            onChangeText={e => setCardName(e)}
                            placeholder="name on card"
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                </View>
                
                <TextInput 
                    style={{
                        width: width/1.25,
                        borderBottomWidth: 1,
                        borderColor: numberFocus ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                        padding: 5,
                        paddingHorizontal: 20,
                        fontFamily: 'Gilroy-Medium',
                        marginTop: 15,
                        color: 'white',
                        borderRadius: 1,
                        fontSize: 12,
                        marginLeft: 20
                    }}
                    onBlur={() => setNumberFocus(false)}
                    onFocus={() => setNumberFocus(true)}
                    value={number}
                    onChangeText={e => setNumber(e)}
                    keyboardType = 'numeric'
                    placeholder="number"
                    placeholderTextColor='rgba(255, 255, 255, 0.3)'
                />

                <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                    <TextInput 
                        style={{
                            width: width/2.7,
                            borderBottomWidth: 1,
                            borderColor: validFocus ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            padding: 5,
                            paddingHorizontal: 20,
                            fontFamily: 'Gilroy-Medium',
                            marginTop: 15,
                            color: 'white',
                            borderRadius: 1,
                            fontSize: 12,
                            marginLeft: 20
                        }}
                        onBlur={() => setValidFocus(false)}
                        onFocus={() => setValidFocus(true)}
                        value={valitTill}
                        onChangeText={e => setValitTill(e)}
                        placeholder="valit till"
                        keyboardType = 'numeric'
                        placeholderTextColor='rgba(255, 255, 255, 0.3)'
                    />
                    <View style={{display: 'flex', flex: 1, alignItems: 'flex-end'}}>
                        <TextInput 
                            style={{
                                width: width/2.7,
                                borderBottomWidth: 1,
                                borderColor: cvvFocus ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                fontFamily: 'Gilroy-Medium',
                                marginTop: 15,
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 12,
                                marginRight: 20
                            }}
                            onBlur={() => setCVVFocus(false)}
                            onFocus={() => setCVVFocus(true)}
                            value={cvv}
                            onChangeText={e => setCVV(e)}
                            placeholder="cvv"
                            keyboardType = 'numeric'
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.75} onPress={() => visa ? setVisa(false) : setVisa(true)} style={{display: 'flex', flexDirection: 'row', marginTop: 35, marginBottom: 40, marginHorizontal: 25, borderWidth: 1,borderColor: 'rgba(255, 255, 255, 0.05)', padding: 20, borderRadius: 1}}>
                    <Text style={{fontFamily: 'Gilroy-Medium', color: 'rgba(255, 255, 255, 0.3)', fontSize: 12}}>VISA {visa ? "Supported" : "NOT Supported"}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderAddCard(){
        return(
            <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <TextInput 
                    style={{
                        width: width - 40,
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
                />
                <TouchableOpacity
                    onPress={() => addNewCard()}
                    activeOpacity={0.75}
                    style={{
                        backgroundColor: 'white',
                        width: width - 40,
                        padding: 15,
                        marginTop: 15,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50
                    }}
                >
                    {loader ? <ActivityIndicator color="black" size="small" />
                    : <Text style={{fontFamily: 'Gilroy-Bold', color: 'black', fontSize: 12}}>Submit</Text>}
                </TouchableOpacity>
            </View>
        )
    }

    function renderError(){
        return(
            <View style={{height: height/1.25, width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    source={require(`../assets/icons/network_error.png`)}
                    style={{
                        width: 120,
                        height: 120
                    }}
                />
                <Text style={{fontFamily: 'Gilroy-Bold', marginTop: 20}}>Network Error</Text>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height}}> 
            {renderHeader()}
            {renderCard()}
            {renderAddCard()}
        </ScrollView>
    );
};
