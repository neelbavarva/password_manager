import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator, ToastAndroid} from 'react-native';
const { width, height } = Dimensions.get("window");
import {API} from '../API'

export default function Home({navigation}){

    const[allPasswords, setAllPasswords] = useState(null) //fetched unarchived Passwords
    const[archivePasswords, setArchivePasswords] = useState(null) //fetched archived Passwords
    const[passwords, setPasswords] = useState(null) // rendering passwords
    const[category, setCategory] = useState("all") // current category

    const fetchPasswords = () => {
        fetch(`${API}/passwords/getNonBankingPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
            setAllPasswords(result)
        })
        .catch((e) => {
            setPasswords("network_error")
            setAllPasswords("network_error")
        })
    }

    const fetchArchivePasswords = () => {
        fetch(`${API}/passwords/getNonBankingArchivePasswords`)
        .then(res=>res.json())
        .then(result=>{
            setArchivePasswords(result)
        })
        .catch((e) => {
            setArchivePasswords("network_error")
        })
    }
    
    const refreshPasswords = () => {
        setPasswords(null)
        setCategory("all")
        fetchPasswords()
        fetchArchivePasswords()
        ToastAndroid.show("Refreshing Passwords", ToastAndroid.SHORT)
    }

    const filterPassword = (e) => {
        if(passwords!=null&&passwords!="network_error"){
            setCategory(e)
            setPasswords(null)
            if(e=="all"){
                setPasswords(allPasswords)
            } else if(e=="archive"){
                setPasswords(archivePasswords)
            } else {
                let tempPasswords = [];
                allPasswords.map(item => {
                    if(item.category == e){
                        tempPasswords.push(item);
                    }
                })
                setPasswords(tempPasswords)
            }
        }
    }

    useEffect(()=>{
        fetchPasswords()
        fetchArchivePasswords()
    },[])

    // Small Components

    function renderNoData(){
        return(
            <View style={{height: height/2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#444444'}}>no added passwords</Text>
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
                <Text style={{fontFamily: 'Gilroy-Bold', marginTop: 25, fontSize: 14}}>Network Error</Text>
            </View>
        )
    }

    // Main Components

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
                        onPress={() => refreshPasswords()}
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
                        borderColor: category=="all" ? 'rgba(255, 255, 255, 0.15)' : null,
                        borderWidth: 1,
                        marginHorizontal: 5,
                    }}
                    onPress={() => filterPassword("all")}
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
                        borderColor: category=="web-app" ? 'rgba(255, 255, 255, 0.15)' : null,
                        borderWidth: 1,
                        marginHorizontal: 5,
                    }}
                    onPress={() => filterPassword("web-app")}
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
                        borderColor: category=="email" ? 'rgba(255, 255, 255, 0.15)' : null,
                        borderWidth: 1,
                        marginHorizontal: 5,
                    }}
                    onPress={() => filterPassword("email")}
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
                        borderColor: category=="other" ? 'rgba(255, 255, 255, 0.15)' : null,
                        borderWidth: 1,
                        marginHorizontal: 5
                    }}
                    onPress={() => filterPassword("other")}
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
                        borderColor: category=="archive" ? 'rgba(255, 255, 255, 0.15)' : null,
                        borderWidth: 1,
                        marginHorizontal: 5
                    }}
                    onPress={() => filterPassword("archive")}
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

    function renderPasswords(){
        return(
            <View>
                {passwords==null?renderLoading():passwords=="network_error"?renderError():passwords.length==0?renderNoData(): 
                <View style={{margin: 25, paddingBottom: 100}}>
                    {passwords.map(item => {
                        return(
                            <TouchableOpacity 
                                key={item._id}
                                onPress={() => navigation.navigate("Password", {_id: item._id, _name: item.name, _email: item.email, _password: item.password, _category: item.category})} 
                                activeOpacity={0.75} 
                                style={{display: 'flex', flexDirection: 'row', padding: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', marginTop: 10, borderRadius: 1}}
                            >
                                <Image 
                                    source={item.category=="web-app" ? require(`../assets/icons/web_app_main.png`) : item.category=="email" ? require(`../assets/icons/email_main.png`) : item.category=="banking" ? require(`../assets/icons/banking_main.png`) : require(`../assets/icons/other_main.png`)}
                                    style={{
                                        width: 35,
                                        height: 35
                                    }}
                                />
                                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
                                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: 'white'}}>{item.name}</Text>
                                    <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, color: 'rgba(255, 255, 255, 0.5)'}}>{item.email}</Text>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <Image 
                                        source={require('../assets/icons/right_arrow.png')}
                                        style={{
                                            width: 20,
                                            height: 7,
                                            marginRight: 10,
                                            tintColor: 'rgba(255, 255, 255, 0.5)'
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
            {renderPasswords()}
        </ScrollView>
    );
}