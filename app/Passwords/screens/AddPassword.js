import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Modal, ActivityIndicator} from 'react-native';
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
                    "name": name,
                    "email": email,
                    "password": password,
                    "key": key,
                    "category": category,
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

    function clearData(){
        setName(null)
        setEmail(null)
        setCategory(null)
        setPassword(null)
        setKey(null)
        setArchive(false)
        setModalVisible(false)
        setLoader(false)
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
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>add password</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>check your all pawned emails and passwords</Text>
                </View>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height}}>
            
            {renderHeader()}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{display: 'flex', height: height/1.9, width: width-40, marginLeft: 20, backgroundColor: '#111111', marginTop: 140, padding: 40}}>
                    <Text style={{display: 'flex', flex: 1, fontFamily: 'Gilroy-Bold', color: '#444444'}}>Select Category</Text>

                    <View style={{marginTop: 20}}>
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
                            <Text style={{display: 'flex', flex: 1, fontFamily: 'Gilroy-Bold', color: '#888888', marginLeft: 30}}>web - app</Text>
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
                            <Text style={{display: 'flex', flex: 1, fontFamily: 'Gilroy-Bold', color: '#888888', marginLeft: 30}}>email</Text>
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
                            <Text style={{display: 'flex', flex: 1, fontFamily: 'Gilroy-Bold', color: '#888888', marginLeft: 30}}>banking</Text>
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
                            <Text style={{display: 'flex', flex: 1, fontFamily: 'Gilroy-Bold', color: '#888888', marginLeft: 30}}>other</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={{margin: 20, backgroundColor: '#111111'}}>
                <Text style={{fontFamily: 'Gilroy-Bold', color: '#222222', marginLeft: 25, marginTop: 30, fontSize: 14, marginBottom: 10}}>Password Details</Text>
                <View style={{alignItems: 'center'}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 12, 
                            borderBottomWidth: 1, 
                            borderColor: nameFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingBottom: 10,
                            paddingHorizontal: 20,
                            width: 100
                        }}>name</Text>
                        <TextInput 
                            style={{
                                width: width - 180,
                                borderBottomWidth: 1,
                                borderColor: nameFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                fontFamily: 'Gilroy-Medium',
                                marginTop: 15,
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 12
                            }}
                            onBlur={() => setNameFocused(false)}
                            onFocus={() => setNameFocused(true)}
                            value={name}
                            onChangeText={e => setName(e)}
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 12, 
                            borderBottomWidth: 1, 
                            borderColor: emailFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingBottom: 10,
                            paddingHorizontal: 20,
                            width: 100
                        }}>email</Text>
                        <TextInput 
                            style={{
                                width: width - 180,
                                borderBottomWidth: 1,
                                borderColor: emailFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                fontFamily: 'Gilroy-Medium',
                                marginTop: 15,
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 12
                            }}
                            onBlur={() => setEmailFocused(false)}
                            onFocus={() => setEmailFocused(true)}
                            value={email}
                            onChangeText={e => setEmail(e)}
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 12, 
                            borderBottomWidth: 1, 
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            paddingBottom: 10,
                            paddingHorizontal: 20,
                            width: 100
                        }}>category</Text>
                        <TouchableOpacity 
                            activeOpacity={0.75}
                            style={{
                                width: width - 180,
                                borderBottomWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                fontFamily: 'Gilroy-Medium',
                                marginTop: 15,
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 12
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={{color: category==null?'rgba(255, 255, 255, 0.3)':'white', fontSize: 12, fontFamily: 'Gilroy-Medium', paddingVertical: 5}}>{category==null ? null : category}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 12, 
                            borderBottomWidth: 1, 
                            borderColor: passwordFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingBottom: 10,
                            paddingHorizontal: 20,
                            width: 100
                        }}>password</Text>
                        <TextInput 
                            style={{
                                width: width - 180,
                                borderBottomWidth: 1,
                                borderColor: passwordFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                fontFamily: 'Gilroy-Medium',
                                marginTop: 15,
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 12
                            }}
                            onBlur={() => setPasswordFocused(false)}
                            onFocus={() => setPasswordFocused(true)}
                            value={password}
                            onChangeText={e => setPassword(e)}
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 12, 
                            borderBottomWidth: 1, 
                            borderColor: keyFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingBottom: 10,
                            paddingHorizontal: 20,
                            width: 100
                        }}>key</Text>
                        <TextInput 
                            style={{
                                width: width - 180,
                                borderBottomWidth: 1,
                                borderColor: keyFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                fontFamily: 'Gilroy-Medium',
                                marginTop: 15,
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 12
                            }}
                            onBlur={() => setKeyFocused(false)}
                            onFocus={() => setKeyFocused(true)}
                            value={key}
                            onChangeText={e => setKey(e)}
                            placeholderTextColor='rgba(255, 255, 255, 0.3)'
                        />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{display: 'flex', 
                            alignSelf: 'flex-end', 
                            fontFamily: 'Gilroy-Bold', 
                            fontSize: 12, 
                            borderBottomWidth: 1, 
                            borderColor: archiveFocused ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                            paddingBottom: 10,
                            paddingHorizontal: 20,
                            width: 100
                        }}>archive</Text>
                        <TouchableOpacity 
                            activeOpacity={0.75}
                            style={{
                                width: width - 180,
                                borderBottomWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                padding: 5,
                                paddingHorizontal: 20,
                                fontFamily: 'Gilroy-Medium',
                                marginTop: 15,
                                color: 'white',
                                borderRadius: 1,
                                fontSize: 12
                            }}
                            onPress={() => archive ? setArchive(false) : setArchive(true)}
                        >
                            <Text style={{color: category==null?'rgba(255, 255, 255, 0.3)':'white', fontSize: 12, fontFamily: 'Gilroy-Medium', paddingVertical: 5}}>{archive ? "Yes" : "No"}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={{
                            backgroundColor: fieldError ? '#FF426F' : 'white',
                            width: width - 80,
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