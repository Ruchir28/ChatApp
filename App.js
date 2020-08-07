import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';
import CreateRoom from './Components/CreateRoom'



export default class App extends React.Component {  
  // eventlistener(eventname,cb)
  // {
  //   this.socket.on(eventname,(data)=>{
  //     //console.log(eventname,data.username);
  //     cb(data);
  //   });
  // }
  createRoomElem=React.createRef();
  
  componentDidMount()
  {
    let socket=io("http://192.168.1.41:3000");
        this.socket=socket;
        this.setState(()=>({socket:socket}));
        socket.on('user_joined',(data)=>{
          console.log('user joined',data.username);
          this.setState((prev)=>({users:[...prev.users,data.username]}));
        });
        socket.on('receive_message',(data)=>{
          console.log('message received');
        this.setState((prev)=>({messagesReceived:[...data.message,...prev.messagesReceived]}));
        });
        // socket.on('disconnected', () => {
        //   this.setState(()=>({disconnect:true}));
        // });
        socket.on('disconnect', (reason) => {
          if (reason == 'ping timeout') {
            // the disconnection was initiated by the server, you need to reconnect manually
            this.socket=io("http://192.168.1.41:3000");
            console.log('in here');
          }
          this.socket=io("http://192.168.1.41:3000");          
          console.log('disconnect at frontend');
          this.setState((prev)=>({messagesReceived:[...[{
            _id:Date.now(),
            text:`You are disconnected press refresh to rejoin`,
            createdAt: new Date(Date.now()),
            system:true
          }],...prev.messagesReceived]}))
          //this.reset();
        });
  }
  reset=()=>{
    this.setState(()=>({messagesReceived:[],users:[]}));
  }
  state={
    users:[],
    messagesReceived:[],
    messagesSent:[],
    disconnect:false
  }


  render() {
    return (
      
      <View style={styles.container}>
        <CreateRoom ref={this.createRoomElem} reset={this.reset}  socket={this.state.socket} users={this.state.users} messagesReceived={this.state.messagesReceived} messagesSent={this.state.messagesSent} disconnect={this.state.disconnect} ></CreateRoom>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
