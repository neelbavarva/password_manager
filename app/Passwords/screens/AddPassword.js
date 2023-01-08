import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Modal, ActivityIndicator, BackHandler} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");
import {API} from '../API'

export default function AddPassword({navigation}){
    
    const[name, setName] = useState(null)
    const[email, setEmail] = useState(null)
    const[category, setCategory] = useState(null)
    const[password, setPassword] = useState(null)
    const[key, setKey] = useState(null)
    const[fieldError, setFieldError] = useState(false)
    const[archive, setArchive] = useState(false)
    const[modalVisible, setModalVisible] = useState(false)

    const[nameFocused, setNameFocused] = useState(false)
    const[emailFocused, setEmailFocused] = useState(false)
    const[passwordFocused, setPasswordFocused] = useState(false)
    const[keyFocused, setKeyFocused] = useState(false)
    const[archiveFocused, setArchiveFocused] = useState(false)

    const[loader, setLoader] = useState(false)

    const addNewPassword = () => {
        if (name==null||email==null||category==null||password==null||key==null||archive==null){
            setFieldError(true)
        } else {
            setLoader(true)
            setFieldError(false)
            fetch(`https://password-manager-xpkf.onrender.com/passwords/newPassword`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "name": name.trim(),
                    "email": email.trim(),
                    "password": password.trim(),
                    "key": key.trim(),
                    "category": category.trim(),
                    "archive": archive
                })

            })
            .then(res=>res.json())
            .then(result=>{
                navigation.navigate("Manage")
                clearData()
            })
            .catch((e) => {
                console.log("Error in POST password "+e);
                setLoader(false)
            })
        }
    }

    useEffect(() => {
        const backAction = () => {
            clearData()
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();
    }, []);

    function renderBack(){
        navigation.navigate("Manage")
        clearData()
    }

    function clearData(){
        setName(null)
        setEmail(null)
        setCategory(null)
        setPassword(null)
        setKey(null)
        setArchive(false)
        setModalVisible(false)
        setLoader(false)
        setFieldError(false)
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
                    <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <TouchableOpacity 
                        onPress={() => renderBack()}
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
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>add password</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>check fields carefully before submitting</Text>
                </View>
            </View>
        )
    }

    function renderModal(){
        return(
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={{display: 'flex', height: 500, width: width-40, marginTop: 215, marginLeft: 20, justifyContent: 'center', alignItems: 'center',  backgroundColor: '#111111', padding: 40}}>
                    <Text style={{display: 'flex', fontFamily: 'Gilroy-Bold', color: '#444444'}}>Select Category</Text>

                    <View style={{marginTop: 50}}>
                        <TouchableOpacity 
                            activeOpacity={0.75}
                            onPress={() => setCategory('web-app') & setModalVisible(false)}
                            style={{borderColor: 'rgba(255, 255, 255, 0.03)', borderWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, paddingHorizontal: 20}}
                        >
                            <Image 
                                source={require(`../assets/icons/web_app.png`)}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                            <Text style={{display: 'flex', width: 150, alignItems: 'center', fontFamily: 'Gilroy-Bold', color: '#888888', marginLeft: 50}}>web - app</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => setCategory('email') & setModalVisible(false)}
                            style={{borderColor: 'rgba(255, 255, 255, 0.03)', borderWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, paddingHorizontal: 20}}
                        >
                            <Image 
                                source={require(`../assets/icons/email.png`)}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                            <Text style={{display: 'flex', width: 150, fontFamily: 'Gilroy-Bold', color: '#888888', marginLeft: 50}}>email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => setCategory('banking') & setModalVisible(false)}
                            style={{borderColor: 'rgba(255, 255, 255, 0.03)', borderWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, paddingHorizontal: 20}}
                        >
                            <Image 
                                source={require(`../assets/icons/banking.png`)}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                            <Text style={{display: 'flex', width: 150, fontFamily: 'Gilroy-Bold', color: '#888888', marginLeft: 50}}>banking</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => setCategory('other') & setModalVisible(false)}
                            style={{borderColor: 'rgba(255, 255, 255, 0.03)', borderWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, paddingHorizontal: 20}}
                        >
                            <Image 
                                source={require(`../assets/icons/other.png`)}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                            <Text style={{display: 'flex', width: 150, fontFamily: 'Gilroy-Bold', color: '#888888', marginLeft: 50}}>other</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height}}>
            
            {renderHeader()}
            {renderModal()}
            
            <View style={{marginTop: 20}}>
                <View style={{alignItems: 'center'}}>
                    <View style={{display: 'flex', flex: 1, flexDirection: 'row', }}>
                        <Text style={{
                            display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 16, 
                            borderBottomWidth: 1, 
                            borderColor: nameFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingVertical: 20,
                            marginLeft: 30,
                            width: 100,
                            color: nameFocused ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.25)',
                        }}>name</Text>
                        <TextInput 
                            style={{
                                display: 'flex',
                                flex: 1,
                                marginRight: 30,
                                borderBottomWidth: 1,
                                borderColor: nameFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                paddingVertical: 17.5,
                                fontFamily: 'Gilroy-Medium',
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 16
                            }}
                            onBlur={() => setNameFocused(false)}
                            onFocus={() => setNameFocused(true)}
                            value={name}
                            onChangeText={e => setName(e)}
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{
                            display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 16, 
                            borderBottomWidth: 1, 
                            borderColor: emailFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingVertical: 20,
                            marginLeft: 30,
                            width: 100,
                            color: emailFocused ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.25)',
                        }}>email</Text>
                        <TextInput 
                            style={{
                                display: 'flex',
                                flex: 1,
                                marginRight: 30,
                                borderBottomWidth: 1,
                                borderColor: emailFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                paddingVertical: 17.5,
                                fontFamily: 'Gilroy-Medium',
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 16
                            }}
                            onBlur={() => setEmailFocused(false)}
                            onFocus={() => setEmailFocused(true)}
                            value={email}
                            onChangeText={e => setEmail(e)}
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{
                            display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 16, 
                            borderBottomWidth: 1, 
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            paddingVertical: 20,
                            marginLeft: 30,
                            width: 100,
                            color: 'rgba(255, 255, 255, 0.25)',
                        }}>category</Text>
                        <TouchableOpacity 
                            activeOpacity={0.75}
                            style={{
                                display: 'flex',
                                flex: 1,
                                marginRight: 30,
                                borderBottomWidth: 1,
                                borderColor:'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                paddingVertical: 17.5,
                                fontFamily: 'Gilroy-Medium',
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 16
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={{color: category==null?'rgba(255, 255, 255, 0.3)':'white', fontSize: 16, fontFamily: 'Gilroy-Medium', paddingVertical: 2.5}}>{category==null ? null : category}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{
                            display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 16, 
                            borderBottomWidth: 1, 
                            borderColor: passwordFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingVertical: 20,
                            marginLeft: 30,
                            width: 100,
                            color: passwordFocused ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.25)',
                        }}>password</Text>
                        <TextInput 
                            style={{
                                display: 'flex',
                                flex: 1,
                                marginRight: 30,
                                borderBottomWidth: 1,
                                borderColor: passwordFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                paddingVertical: 17.5,
                                fontFamily: 'Gilroy-Medium',
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 16
                            }}
                            onBlur={() => setPasswordFocused(false)}
                            onFocus={() => setPasswordFocused(true)}
                            value={password}
                            onChangeText={e => setPassword(e)}
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{
                            display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 16, 
                            borderBottomWidth: 1, 
                            borderColor: keyFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingVertical: 20,
                            marginLeft: 30,
                            width: 100,
                            color: keyFocused ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.25)',
                        }}>key</Text>
                        <TextInput 
                            style={{
                                display: 'flex',
                                flex: 1,
                                marginRight: 30,
                                borderBottomWidth: 1,
                                borderColor: keyFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                paddingVertical: 17.5,
                                fontFamily: 'Gilroy-Medium',
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 16
                            }}
                            onBlur={() => setKeyFocused(false)}
                            onFocus={() => setKeyFocused(true)}
                            value={key}
                            onChangeText={e => setKey(e)}
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{
                            display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 16, 
                            borderBottomWidth: 1, 
                            borderColor: archiveFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingVertical: 20,
                            marginLeft: 30,
                            width: 100,
                            color: 'rgba(255, 255, 255, 0.25)',
                        }}>archive</Text>
                        <TouchableOpacity 
                            activeOpacity={0.75}
                            style={{
                                display: 'flex',
                                flex: 1,
                                marginRight: 30,
                                borderBottomWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                paddingVertical: 17.5,
                                fontFamily: 'Gilroy-Medium',
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 16
                            }}
                            onPress={() => archive ? setArchive(false) : setArchive(true)}
                        >
                            <Text style={{color: category==null?'rgba(255, 255, 255, 0.3)':'white', fontSize: 16, fontFamily: 'Gilroy-Medium', paddingVertical: 5}}>{archive ? "Yes" : "No"}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={{
                            backgroundColor: fieldError ? '#FF426F' : 'white',
                            width: width - 60,
                            padding: 15,
                            marginTop: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 30,
                            height: 50
                        }}
                        onPress={() => addNewPassword()}
                    >
                        {loader ? <ActivityIndicator color="black" size="small" />
                        : <Text style={{fontFamily: 'Gilroy-Bold', color: 'black', fontSize: 12}}>Submit</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}