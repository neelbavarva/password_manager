import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");
import {API} from '../API'

export default function Home({navigation}){

    const[passwords, setPasswords] = useState(null)

    const fetchPasswords = () => {
        fetch(`${API}/passwords/getNonBankingPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
        })
        .catch((e) => {
            setPasswords("network_error");
        })
    }

    useEffect(()=>{
        fetchPasswords()
    },[])

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
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>your all passwords</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>enter your key to decrypt your passwords</Text>
                </View>
            </View>
        )
    }

    function renderCategory(){
        return(
            <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{display: 'flex', flexDirection: 'row', marginHorizontal: 25, marginTop: 10, opacity: passwords==null ? 0.5 : 1}}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        borderRadius: 100,
                        height: 35,
                        alignItems: 'center',
                        paddingRight: 20,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        marginHorizontal: 5,
                    }}
                    
                >
                    <Image 
                        source={require('../assets/icons/all.png')}
                        style={{
                            width: 32.5,
                            height: 32.5,
                            marginLeft: -5
                        }}
                    />
                    <Text 
                        style={{
                            display: 'flex', 
                            marginLeft: 10, 
                            fontFamily: 'Gilroy-Medium',
                            fontSize: 12,
                            marginBottom: 1,
                            color: '#D2D2D2'
                        }}
                    >
                        all
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        borderRadius: 100,
                        height: 35,
                        alignItems: 'center',
                        paddingRight: 20,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        marginHorizontal: 5,
                    }}
                >
                    <Image 
                        source={require('../assets/icons/web_app.png')}
                        style={{
                            width: 32.5,
                            height: 32.5,
                            marginLeft: -5
                        }}
                    />
                    <Text 
                        style={{
                            display: 'flex', 
                            marginLeft: 10, 
                            fontFamily: 'Gilroy-Medium',
                            fontSize: 12,
                            marginBottom: 1,
                            color: '#D2D2D2'
                        }}
                    >
                        web - app
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        borderRadius: 100,
                        height: 35,
                        alignItems: 'center',
                        paddingRight: 20,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        marginHorizontal: 5,
                    }}
                >
                    <Image 
                        source={require('../assets/icons/email.png')}
                        style={{
                            width: 32.5,
                            height: 32.5,
                            marginLeft: -5
                        }}
                    />
                    <Text 
                        style={{
                            display: 'flex', 
                            marginLeft: 10, 
                            fontFamily: 'Gilroy-Medium',
                            fontSize: 12,
                            marginBottom: 1,
                            color: '#D2D2D2'
                        }}
                    >
                        email
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        borderRadius: 100,
                        height: 35,
                        alignItems: 'center',
                        paddingRight: 20,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        marginHorizontal: 5
                    }}
                >
                    <Image 
                        source={require('../assets/icons/other.png')}
                        style={{
                            width: 32.5,
                            height: 32.5,
                            marginLeft: -5
                        }}
                    />
                    <Text 
                        style={{
                            display: 'flex', 
                            marginLeft: 10, 
                            fontFamily: 'Gilroy-Medium',
                            fontSize: 12,
                            marginBottom: 1,
                            color: '#D2D2D2'
                        }}
                    >
                        other
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        borderRadius: 100,
                        height: 35,
                        alignItems: 'center',
                        paddingRight: 20,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        marginHorizontal: 5
                    }}
                >
                    <Image 
                        source={require('../assets/icons/archive.png')}
                        style={{
                            width: 30,
                            height: 30,
                            marginLeft: -2
                        }}
                    />
                    <Text 
                        style={{
                            display: 'flex', 
                            marginLeft: 10, 
                            fontFamily: 'Gilroy-Medium',
                            fontSize: 12,
                            marginBottom: 1,
                            color: '#D2D2D2'
                        }}
                    >
                        archive
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    function renderNoData(){
        return(
            <View style={{height: height/2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#444444'}}>no added passwords !</Text>
            </View>
        )
    }

    function renderLoading(){
        return(
            <View style={{height: height/2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="white" size="large" />
            </View>
        )
    }

    function renderError(){
        return(
            <View style={{height: height/1.75, width: width, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    source={require(`../assets/icons/network_error.png`)}
                    style={{
                        width: 100,
                        height: 100
                    }}
                />
                <Text style={{fontFamily: 'Gilroy-Bold', marginTop: 25}}>Network Error</Text>
            </View>
        )
    }

    function renderPasswords(){
        return(
            <View>
                {passwords.length==0 || passwords=="network_error" ? renderNoData() : 
                <View style={{margin: 25, paddingBottom: 100}}>
                    {passwords.map(item => {
                        return(
                            <TouchableOpacity onPress={() => navigation.navigate("Password", {_id: item._id, _name: item.name, _email: item.email, _password: item.password, _category: item.category})} activeOpacity={0.75} key={item._id} style={{padding: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'row', marginTop: 10, borderRadius: 1}}>
                                <View>
                                    <Image 
                                        source={item.category=="banking" ? require(`../assets/icons/banking_main.png`) : item.category=="web-app" ? require(`../assets/icons/web_app_main.png`) : item.category=="email" ? require(`../assets/icons/email_main.png`) : require(`../assets/icons/other_main.png`)}
                                        style={{
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                </View>
                                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
                                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: 'white'}}>{item.name}</Text>
                                    <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12}}>{item.email}</Text>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <Image 
                                        source={require('../assets/icons/left_arrow.png')}
                                        style={{
                                            width: 20,
                                            height: 7,
                                            marginRight: 10,
                                            tintColor: 'grey'
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>}
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height}}>
            {renderHeader()}
            {renderCategory()}
            {passwords==null?renderLoading():passwords=="network_error"?renderError():renderPasswords()}
        </ScrollView>
    );
}