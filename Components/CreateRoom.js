import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import io from 'socket.io-client';
import ChatScreen from './ChatScreen';


export default class CreateRoom extends Component {

    componentDidMount() {

    }
    componentDidUpdate()
    {
        
    }

    state = {
        roomname: '',
        username: '',
        users: [],
        joined: false
    }
    onchange = (text) => {
        this.setState(() => ({ roomname: text }));
    }
    onchange1 = (text) => {
        this.setState(() => ({ username: text }));
    }
    onsubmit = async () => {
        <Text>{this.props.users}</Text>
       // await this.setState((prev)=>({roomname:`${prev.roomname}-${Date.now()}`}))
        this.props.socket.emit('join_room', {
            username: this.state.username,
            chatroom: this.state.roomname,
        });
        this.setState(() => ({joined: true }));
    }
    call=()=>{
        this.setState(()=>({joined:false,username:'',roomname:''}));
        this.props.reset();                             
    }
    call1=()=>{
        this.props.socket.emit('join_room', {
            username: this.state.username,
            chatroom: this.state.roomname,
        });
    }

    render() {
       
        if (this.state.joined) {
            return (<ChatScreen call1={this.call1} call={this.call}username={this.state.username} roomname={this.state.roomname}  users={this.props.users} messagesReceived={this.props.messagesReceived} messagesSent={this.props.messagesSent} socket={this.props.socket}></ChatScreen>)
        }
        return (

            <View>

                <Input
                    placeholder='Enter Chatroom Name'
                    leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
                    onChangeText={(text) => this.onchange(text)}
                    value={this.state.roomname}
                />
                <Input
                    placeholder='Enter User Name'
                    leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
                    onChangeText={(text) => this.onchange1(text)}
                    value={this.state.username}
                />
                <Button onPress={this.onsubmit} buttonStyle={{ marginBottom: 20 }} title="Create Room" />
            </View>
        )
    }
}
