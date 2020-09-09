import React, { Component } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
// Import Package
import io from "socket.io-client"

class App extends Component {

  constructor(props) { 
    super(props);
    this.state = { 
      chatMessage : "",
      chatMessages : []
    }
  }

  componentDidMount(){
    // Koneksi ke Socket
    this.socket = io("http://192.168.1.13:3000");
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages : [...this.state.chatMessages, msg]});
    });
  }

  submitChatMessage() { 
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({chatMessage : ""})
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => <Text key ={chatMessage}>{chatMessage}</Text>)
    return (
      <View style={styles.container}>
        <TextInput 
          style={{height : 40, borderWidth : 2 }}
          autoCorrect={false}
          value = { this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage});
          }}
        />
        {chatMessages}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
