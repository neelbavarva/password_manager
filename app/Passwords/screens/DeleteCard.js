import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator, Modal, BackHandler} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");
import {API} from '../API'

export default function DeleteCard({navigation}){

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
        })
        .catch((e) => {
            console.log("Error in DELETE password "+e);
            setLoader(null)
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
                <View style={{display: 'flex', height: 300, width: width-40, marginTop: 215, marginLeft: 20, justifyContent: 'center', alignItems: 'center',  backgroundColor: '#111111', padding: 40}}>
                    {passwordId==null || passwordName==null ? 
                    renderLoading():
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
                        renderLoading()}
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
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>delete your Cards</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>be careful while deleting your cards</Text>
                </View>
            </View>
        )
    }

   

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height, paddingBottom: 50}}>
            {renderHeader()}
            
        </ScrollView>
    );
}