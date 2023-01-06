import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ImageBackground, ActivityIndicator, ToastAndroid} from 'react-native';
const { width, height } = Dimensions.get("window");
import {API} from '../API'

export default function Banking({navigation}){

    const[allPasswords, setAllPasswords] = useState(null) //fetched unarchived Passwords
    const[archivePasswords, setArchivePasswords] = useState(null) //fetched archived Passwords
    const[cards, setCards] = useState(null) // fetched Cards
    const[passwords, setPasswords] = useState(null) // rendering passwords
    const[category, setCategory] = useState("all") // current category

    const fetchPasswords = () => {
        fetch(`${API}/passwords/getBankingPasswords`)
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
        fetch(`${API}/passwords/getBankingArchivePasswords`)
        .then(res=>res.json())
        .then(result=>{
            setArchivePasswords(result)
        })
        .catch((e) => {
            setArchivePasswords("network_error")
        })
    }

    const fetchCards = () => {
        fetch(`${API}/cards/getCards`)
        .then(res=>res.json())
        .then(result=>{
            setCards(result)
        })
        .catch((e) => {
            setCards("network_error")
        })
    }

    const filterPassword = (e) => {
        setCategory(e)
        e == "all" ? setPasswords(allPasswords) : setPasswords(archivePasswords)
    } 

    const refreshPasswords = () => {
        setPasswords(null)
        setCards(null)
        setCategory("all")
        fetchCards()
        fetchPasswords()
        fetchArchivePasswords()
        ToastAndroid.show("Refreshing Cards & Passwords", ToastAndroid.SHORT)
    }

    useEffect(()=>{
        fetchCards()
        fetchPasswords()
        fetchArchivePasswords()
    },[])


    // Small Components

    function renderNoData(){
        return(
            <View style={{height: height/2.5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>your banking data</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>be careful while using your banking data</Text>
                </View>
            </View>
        )
    }

    function renderCards(){
        return(
            <View style={{marginTop: -10, marginBottom: 20}}>
                <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{display: 'flex', flexDirection: 'row', marginTop: 10, marginHorizontal: 20, marginRight: 25}}>
                    {cards.map(item => {
                        return(
                            <ImageBackground
                                key = {item._id}
                                source={item.bankName.toLowerCase().includes("sbi") ? require('../assets/images/sbi_card.png') 
                                : item.bankName.toLowerCase().includes("axis") ? require('../assets/images/axis_card.png')
                                : item.bankName.toLowerCase().includes("hdfc") ? require('../assets/images/hdfc_card.png')
                                : item.bankName.toLowerCase().includes("icici") ? require('../assets/images/icici_card.png')
                                : item.bankName.toLowerCase().includes("iob") ? require('../assets/images/iob_card.png')
                                : item.bankName.toLowerCase().includes("slice") ? require('../assets/images/slice_card.png')
                                : require('../assets/images/other_card.png')}
                                style={{
                                    width: 300,
                                    height: 171,
                                    marginHorizontal: 5
                                }}
                                imageStyle={{ borderRadius: 8}}
                            >
                                <Text style={{marginTop: 25, fontFamily: 'Gilroy-Bold', marginLeft: 20, fontSize: 12, color: 'white'}}>{("XXXX XXXX XXXX " + item.number.substring(12))}</Text>
                                <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'flex-end', marginBottom: 20, marginLeft: 17.5}}>
                                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 10, color: 'white'}}>
                                        {item.cardName}
                                    </Text>
                                    <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 20}}>
                                        <TouchableOpacity onPress={() => navigation.navigate("Card", {_id: item._id, _bankName: item.bankName, _cardName: item.cardName, _number: item.number, _validTill: item.validTill, _cvv: item.cvv, _visa: item.visa})}>
                                            <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 10, color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 5, paddingHorizontal: 10, borderRadius: 5}}>View</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    function renderCategory(){
        return(
            <View style={{display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 100, marginHorizontal: 25, marginTop: 10}}>
                <TouchableOpacity
                    onPress={() => filterPassword("all")}
                    style={{
                        flex: 1,
                        padding: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 100,
                        backgroundColor: category=="all" ? 'rgba(255, 255, 255, 0.1)' : null,
                    }}
                >
                    <View style={{width: 7.5, height: 7.5, borderRadius: 100, backgroundColor: '#3F6FD9', marginTop: 1.75}} />
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 12, marginLeft: 7.5, color: '#D2D2D2'}}>all</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => filterPassword("archive")}
                    style={{
                        flex: 1,
                        padding: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 100,
                        backgroundColor: category=="archive" ? 'rgba(255, 255, 255, 0.1)' : null,
                    }}
                >
                    <View style={{width: 7.5, height: 7.5, borderRadius: 100, backgroundColor: '#FFCB45', marginTop: 1.75}} />
                    <Text style={{fontFamily: 'Gilroy-Medium', fontSize: 12, marginLeft: 7.5, color: '#D2D2D2'}}>archived</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderPasswords(){
        return(
            <View>
                {passwords==null?renderLoading():passwords=="network_error"?renderError():passwords.length==0?renderNoData(): 
                <View style={{margin: 25, marginTop: 20, paddingBottom: 100}}>
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
            {cards==null||passwords==null ? renderLoading() : 
            <View>
                {renderCards()}
                {renderCategory()}
                {renderPasswords()}
            </View>}
        </ScrollView>
    );
}