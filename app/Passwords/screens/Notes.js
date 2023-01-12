import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Image, Button, TextInput, AsyncStorage, LogBox, ActivityIndicator} from 'react-native';

const { width, height } = Dimensions.get("window");


export default class Notes extends Component {

    state = {
        isEdit: null,
        list: [],
        isLoading: false,
        editText: '',
    };
      
    componentDidMount = () => {
        this.setState({isLoading: true});
        AsyncStorage.getItem('list')
            .then(list => {
                if (list) {
                    this.setState({list: JSON.parse(list), isLoading: false});
                } else {
                    this.setState({list: [], isLoading: false});
                }
            })
            .catch(err => {
                this.setState({isLoading: false});
            });
    };
      
    add = () => {
        let list = this.state.list;
        list.push('');
        this.setState({list: list});
        this.saveToStorage();
        
        this.setEdit(list.length-1);
    };
      
    setEdit = index => {
        if (this.state.isEdit !== index) {
            this.setState({isEdit: index, editText: this.state.list[index]});
        }
    };
      
    setList = (text, index) => {
        let list = this.state.list;
        list[index] = text;
        this.setState({list: list, isEdit: null, editText: ''});
        this.saveToStorage();
    };
      
    saveToStorage = () => {
        let data = JSON.stringify(this.state.list);
        AsyncStorage.setItem('list', data);
    };
      
    deleteItem = index => {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({list: list});
        this.saveToStorage();
    };

    
      
    render() {

        return (
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={style.container}>
                
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
                        <TouchableOpacity 
                        onPress={() => this.add()}
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
                                source={require('../assets/icons/add.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 100
                                }}
                            />
                            <Text style={{color: '#8A8A8A', fontFamily: 'Gilroy-Bold', fontSize: 12, marginLeft: 12.5, marginRight: 7.5}}>add Note</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{paddingHorizontal: 25, paddingBottom: 25}}>
                    <Text style={{color: 'white', fontFamily: 'Cirka-Bold', fontSize: 28}}>take your Notes</Text>
                    <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Gilroy-Medium', fontSize: 14, marginTop: 5}}>notes added in this screen are stored locally</Text>
                </View>

                {this.state.list.length==0 ?
                <View style={{display: 'flex', height: height-400, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{height: 120, width: 100}} source={require('../assets/icons/notes.png')} />
                    <Text style={{fontFamily: 'Gilroy-Bold', fontSize: 12, color: '#8A8A8A', marginTop: 20}}>"add Note" to Continue</Text>
                </View>
                : this.state.isLoading ? (
                    <ActivityIndicator color="white" size="large" />
                ) : (
                <View style={style.body}>
                    {this.state.list.map((item, key) => (
                        <React.Fragment key={key}>
                        {this.state.isEdit === null || this.state.isEdit !== key ? (
                            <View style={style.item} activeOpacity={0.5} onLongPress={() => this.setEdit(key)}>
                            <Text style={style.itemText}>{item}</Text>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                style={style.itemDelete}
                                onPress={() => this.deleteItem(key)}>
                                <Image style={{width: 20, height: 20, marginRight: 10, tintColor: '#222222'}} source={require('../assets/icons/cross.png')} />
                            </TouchableOpacity>
                            </View>
                        ) : null}
                        {this.state.isEdit !== null ? (
                            key == this.state.isEdit ? (
                            <TextInput
                                placeholderTextColor="grey"
                                placeholder="Add Note"
                                style={style.itemInput}
                                onBlur={() => this.setList(this.state.editText, key)}
                                onSubmitEditing={() =>
                                this.setList(this.state.editText, key)
                                }
                                value={this.state.editText}
                                autoFocus
                                onChangeText={editText => this.setState({editText})}
                            />
                            ) : null
                        ) : null}
                        </React.Fragment>
                    ))}
                </View>
                )}
                <View style={{paddingBottom: 100}} />
                
            </ScrollView>
            );
        }
    }
const style = StyleSheet.create({
    container: {
        backgroundColor: 'black', 
        height: '100%'
    },
    header: {
        backgroundColor: '#d2d2d2',
        elevation: 5,
        paddingHorizontal: '5%',
        paddingVertical: 20,
    },
    headerText: {
        fontSize: 20,
    },
    btnAddText: {
        fontSize: 25,
        fontWeight: '700',
    },
    body: {paddingHorizontal: '4%'},
    item: {
        marginBottom: 5,
        backgroundColor: '#111111',
        padding: 30,
        minHeight: 50,
        justifyContent: 'center',
        paddingVertical: 30,
        marginTop: 5
    },
    itemDelete: {
        position: 'absolute',
        fontSize: 16,
        padding: 10,
        right: 0,
    },
    itemDeleteText: {
        fontSize: 16,
    },
    itemText: {
        fontSize: 14,
        paddingHorizontal: '1%',
        fontFamily: 'Gilroy-Medium',
        marginRight: 50,
        lineHeight: 22,
        color: 'white'
    },
    itemInput: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        paddingHorizontal: 20,
        fontFamily: 'Gilroy-Medium',
        marginTop: 15,
        color: 'white',
        borderRadius: 1
    },
})