import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { Input, Button } from 'react-native-elements'
import MessageBubble from './MessageBubble';
import { GiftedChat } from 'react-native-gifted-chat'


export default class ChatScreen extends Component {
    state = {
        msg: '',
    }
    onchange = (text) => {
        this.setState(() => ({ msg: text }));
    }
    // onsubmit = () => {

    //     this.props.socket.emit('send_message', {
    //         username: this.props.username,
    //         chatroom: this.props.roomname,
    //         message:this.state.msg
    //     });
    //     this.setState(()=>({msg:''}));

    // }

    onsubmit = (messages) => {

        this.props.socket.emit('send_message', {
            username: this.props.username,
            chatroom: this.props.roomname,
            message: messages
        });
    }
    refresh=()=>{
        this.props.socket.emit('send_message', {
            username: this.props.username,
            chatroom: this.props.roomname,
            message: messages
        });
    }
    render() {
        const chat = <GiftedChat messages={this.props.messagesReceived} onSend={this.onsubmit} user={{
            _id: this.props.username,
            name: this.props.username
        }}></GiftedChat>

        return (
            <View style={{ flex: 1, paddingTop: 40 }} behavior="height" keyboardVerticalOffset={1} enabled>
                <Text>{JSON.stringify(this.props.roomname)}</Text>        
                <Button buttonStyle={{backgroundColor: 'orange' }} title={`ROOM NAME:${this.props.roomname}`}></Button>
                <View style={{flexDirection:'row',justifyContent:'space-evenly',height:40}}>
                <Button onPress={() => this.props.call()}  title='leave room'></Button>
                <Button buttonStyle={{backgroundColor: 'purple'}} onPress={() => this.props.call1()} style={{ width: 10, height: 10 }} title='Refresh'></Button>
                </View>
                {chat}
            </View>
        )
        // return (
        //     <ScrollView style={Styles.container}>
        //         {/* <Text>{JSON.stringify(this.props.messagesReceived)}</Text>
        //         <Text>{this.props.messagesSent}</Text>
        //         */}
        //         {/* <View style={[{height:70,backgroundColor:'red',flex:1,flexDirection:'row',justifyContent:'space-around'},Styles.container,Styles.container1]}> 
        //         <Text style={Styles.text}>ROOM NAME:{this.props.roomname}</Text>
        //         <Button onPress={()=>this.props.call()} style={{width:10,height:10}} title='leave room'>LEAVE ROOM</Button>
        //         </View>
        //         */}
        //         {/* {this.props.messagesReceived && this.props.messagesReceived.map((msg)=>{
        //             if(msg.username==this.props.username)
        //             {
        //                 return(<MessageBubble text={msg.message}></MessageBubble>)
        //             }
        //             else{
        //                 return(<MessageBubble subscript={msg.username} mine text={msg.message}></MessageBubble>)
        //             }
        //         })} */}
        //         <GiftedChat
        //             messages={this.state.messages1}
        //             onSend={messages => this.onsubmit(messages)}
        //             user={{
        //                 _id: 1,
        //             }}
        //         ></GiftedChat>
        //         {/* <Input
        //             placeholder='Enter Message'
        //             leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        //             onChangeText={(text) => this.onchange(text)}
        //             value={this.state.msg}
        //         />
        //          <Button onPress={this.onsubmit} buttonStyle={{ marginBottom: 20 }} title="Send" /> */}
        //     </ScrollView>
        // )
    }
}
const Styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    container1: {
        borderRadius: 20
    },
    text: {
        color: 'blue',
        fontSize: 16,
        lineHeight: 15
    }
})