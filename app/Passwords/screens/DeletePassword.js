import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator, Modal, BackHandler, ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");
import {API} from '../API'

export default function DeletePassword({navigation}){

    const[allPasswords, setAllPasswords] = useState(null) //fetched unarchived Passwords
    const[archivePasswords, setArchivePasswords] = useState(null) //fetched archived Passwords
    const[passwords, setPasswords] = useState(null) // rendering passwords
    const[category, setCategory] = useState("all") // current category

    const[loader, setLoader] = useState(null)
    const[modalVisible, setModalVisible] = useState(false)

    const[passwordId, setPasswordId] = useState(null)
    const[passwordName, setPasswordName] = useState(null)

    const fetchPasswords = () => {
        fetch(`${API}/passwords/getPasswords`)
        .then(res=>res.json())
        .then(result=>{
            setPasswords(result)
            setAllPasswords(result)
        })
        .catch((e) => {
            setPasswords("network_error");
            setAllPasswords("network_error")
        })
    }

    const fetchArchivePasswords = () => {
        fetch(`${API}/passwords/getArchivePasswords`)
        .then(res=>res.json())
        .then(result=>{
            setArchivePasswords(result)
        })
        .catch((e) => {
            setArchivePasswords("network_error");
        })
    }

    const removePassword = (_id) => {
        setLoader(_id)
        fetch(`${API}/passwords/deletePassword/${_id}`,{
            method: 'DELETE'
        })
        .then(res=>res.json())
        .then(result=>{
            fetchPasswords()
            fetchArchivePasswords()
            setModalVisible(false)
            setPasswordId(null)
            setPasswordName(null)
            navigation.navigate("Manage")
            setLoader(null)
            ToastAndroid.show("Password Deleted Successfully", ToastAndroid.SHORT)
        })
        .catch((e) => {
            fetchPasswords()
            fetchArchivePasswords()
            setModalVisible(false)
            setPasswordId(null)
            setPasswordName(null)
            navigation.navigate("Manage")
            setLoader(null)
            ToastAndroid.show("ERROR while deleting the Password", ToastAndroid.SHORT)
        })
    }

    const refreshPasswords = () => {
        setPasswords(null)
        setArchivePasswords(null)
        fetchPasswords()
        fetchArchivePasswords()
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
        const backAction = () => {
            setModalVisible(false)
            setPasswordId(null)
            setPasswordName(null)
            setLoader(null)
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();
    },[])

    // Small Components

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

    function renderSmallLoading(){
        return(
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 65}}>
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

    // Main Components

    function renderModal(){
        return(
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={{display: 'flex', height: 300, width: width-50, marginTop: 215, marginLeft: 25, justifyContent: 'center', alignItems: 'center',  backgroundColor: '#111111', padding: 40}}>
                    {passwordId==null || passwordName==null ? 
                    renderSmallLoading():
                    <View>
                        <Text style={{display: 'flex', fontFamily: 'Gilroy-Bold', color: 'rgba(255, 255, 255, 0.75)', fontSize: 16, lineHeight: 24}}>Confirm to delete "{passwordName}" ?</Text>
                        {loader==null?
                        <View style={{marginTop: 50, display: 'flex', flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => setModalVisible(false) & setPasswordId(null) & setPasswordName(null)} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', paddingVertical: 15, borderRadius: 1}}>
                                <Text style={{display: 'flex', fontFamily: 'Gilroy-Bold', color: 'rgba(255, 255, 255, 0.75)', fontSize: 16}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removePassword(passwordId)} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', paddingVertical: 15, borderRadius: 1}}>
                                <Text style={{display: 'flex', fontFamily: 'Gilroy-Bold', color: 'rgba(255, 255, 255, 0.75)', fontSize: 16}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>:
                        renderSmallLoading()}
                    </View>}
                </View>
            </Modal>
        )
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
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>delete your Passwords</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>be careful while deleting your password</Text>
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
                        borderColor: category=="banking" ? 'rgba(255, 255, 255, 0.15)' : null,
                        borderWidth: 1,
                        marginHorizontal: 5,
                    }}
                    onPress={() => filterPassword("banking")}
                >
                    <Image 
                        source={require('../assets/icons/banking.png')}
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
                        banking
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
                {passwords.length==0 || passwords=="network_error" ? renderNoData() : 
                <View style={{margin: 25, paddingBottom: 100}}>
                    {passwords.map(item => {
                        return(
                            <View key={item._id} style={{padding: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'row', marginTop: 10, borderRadius: 1}}>
                                <View style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                                    <View>
                                        <Image 
                                            source={item.category=="banking" ? require(`../assets/icons/banking_main.png`) : item.category=="web-app" ? require(`../assets/icons/web_app_main.png`) : item.category=="email" ? require(`../assets/icons/email_main.png`) : require(`../assets/icons/other_main.png`)}
                                            style={{
                                                width: 35,
                                                height: 35
                                            }}
                                        />
                                    </View>
                                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
                                        <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: 'white'}}>{item.name}</Text>
                                        <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12}}>{item.email}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => setPasswordId(item._id) & setPasswordName(item.name) & setModalVisible(true)} activeOpacity={0.75} style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <Image 
                                        source={require('../assets/icons/cross.png')}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            margin: 10,
                                            tintColor: 'grey'
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>}
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height, paddingBottom: 50}}>
            {renderHeader()}
            {renderCategory()}
            {renderModal()}
            {passwords==null?renderLoading():passwords=="network_error"?renderError():renderPasswords()}
        </ScrollView>
    );
}