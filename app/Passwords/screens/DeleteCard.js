import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator, Modal, BackHandler, ImageBackground, ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");
import {API} from '../API'

export default function DeleteCard({navigation}){

    const[cards,setCards] = useState(null)

    const[cardId, setCardId] = useState(null)
    const[cardName, setCardName] = useState(null)
    const[cardNumber, setCardNumber] = useState(null)
    const[cardBank, setCardBank] = useState(null)
    const[loader, setLoader] = useState(null)
    const[modalVisible, setModalVisible] = useState(false)

    const fetchCards = () => {
        fetch(`${API}/cards/getCards`)
        .then(res=>res.json())
        .then(result=>{
            setCards(result)
        }).catch((e) => {
            setCards("network_error");
        })
    }

    const deleteCard = () => {
        setLoader(cardId)
        fetch(`${API}/cards/deleteCard/${cardId}`,{
            method: 'DELETE'
        })
        .then(res=>res.json())
        .then(result=>{
            fetchCards()
            setModalVisible(false) 
            setCardId(null) 
            setCardName(null) 
            setCardNumber(null) 
            setCardBank(null)
            setLoader(null)
            navigation.navigate("Manage")
            ToastAndroid.show("Card Deleted Successfully", ToastAndroid.SHORT)
        })
        .catch((e) => {
            fetchCards()
            setModalVisible(false) 
            setCardId(null) 
            setCardName(null) 
            setCardNumber(null) 
            setCardBank(null)
            setLoader(null)
            navigation.navigate("Manage")
            ToastAndroid.show("ERROR while deleting the Card", ToastAndroid.SHORT)
        })
    }

    const refreshCards = () => {
        setCards(null)
        fetchCards()
    }

    useEffect(()=>{
        fetchCards()
        const backAction = () => {
            setModalVisible(false) 
            setCardId(null) 
            setCardName(null) 
            setCardNumber(null) 
            setCardBank(null)
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
                <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 14, color: '#444444'}}>no added Cards !</Text>
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
                <View style={{display: 'flex', height: 300, width: width-40, marginTop: 215, marginLeft: 20, justifyContent: 'center', alignItems: 'center',  backgroundColor: '#111111', padding: 40}}>
                    {cardId==null || cardName==null || cardNumber==null || cardBank==null ? 
                    renderSmallLoading():
                    <View>
                        <Text style={{display: 'flex', fontFamily: 'Gilroy-Bold', color: 'rgba(255, 255, 255, 0.75)', fontSize: 14, lineHeight: 24}}>Confirm to delete {cardBank} Card of {cardName} ?</Text>
                        <Text style={{display: 'flex', fontFamily: 'Gilroy-Bold', color: 'rgba(255, 255, 255, 0.75)', fontSize: 14, lineHeight: 24, marginTop: 20}}>Card Number: {cardNumber}</Text>
                        {loader==null?
                        <View style={{marginTop: 35, display: 'flex', flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => setModalVisible(false) & setCardId(null) & setCardName(null) & setCardNumber(null) & setCardBank(null)} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', paddingVertical: 15, borderRadius: 1}}>
                                <Text style={{display: 'flex', fontFamily: 'Gilroy-Bold', color: 'rgba(255, 255, 255, 0.75)', fontSize: 16}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteCard()} style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', paddingVertical: 15, borderRadius: 1}}>
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
                        onPress={() => refreshCards()}
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
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>be careful while deleting your card</Text>
                </View>
            </View>
        )
    }

    function renderCards(){
        return(
            <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50}}>
                {cards.length==0 ? renderNoData() : 
                <ScrollView vertical showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  style={{display: 'flex', flexDirection: 'row', marginHorizontal: 10, borderRadius: 10}}>
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
                                width: 370,
                                height: 211,
                                marginHorizontal: 5,
                                marginTop: 20
                            }}
                            imageStyle={{ borderRadius: 7.5}}
                        >
                            <Text style={{marginTop: 22, fontFamily: 'Gilroy-Bold', marginLeft: 20, fontSize: 12, color: 'white'}}>{("XXXX XXXX XXXX " + item.number.substring(12))}</Text>
                            <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'flex-end', marginBottom: 20, marginLeft: 20}}>
                                <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 10, color: 'white'}}>
                                    {item.cardName}
                                </Text>
                                <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 20}}>
                                    <TouchableOpacity onPress={() => setCardId(item._id) & setCardName(item.cardName) & setCardNumber(item.number) & setCardBank(item.bankName) & setModalVisible(true)}>
                                        <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 10, color: '#FF426F', backgroundColor: 'rgba(255, 66, 111, 0.25)', padding: 5, paddingHorizontal: 10, borderRadius: 4}}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    )
                })}
            </ScrollView>}
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{backgroundColor: 'black', height: height, paddingBottom: 50}}>
            {renderHeader()}
            {renderModal()}
            {cards==null?renderLoading():cards=="network_error"?renderError():renderCards()}
        </ScrollView>
    );
}