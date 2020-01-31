import React, {Component} from 'react';
import {GiftedChat, Send} from 'react-web-gifted-chat';
import {Redirect} from 'react-router-dom';
import auth from '../../utils/auth';
let socket = require('socket.io-client')('http://167.71.223.162:4000');


class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      response: 0,
      user: {},
      mentor_id:''
    };
    this.onSend = this.onSend.bind(this);
  }


  componentDidMount() {
    console.log(this.props.match.params.id);
    this.setState({ user: JSON.parse(auth.getUser()),mentor_id:this.props.match.params.id });
    socket.on("outgoing data", data => {
   //   console.log(data)
      if(data[0].user._id == this.state.mentor_id){
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, data),
        }));
      }
     
    });
}


  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }
  
  renderSend(props) {
    if (!props.text.trim()) {
      return (
        <img
          onClick={() => {
            var timestamp = (
              Date.now().toString(36) +
              Math.random()
                .toString(36)
                .substr(2, 5)
            ).toUpperCase();
            const msg = [
              {
                id: 3,
                text: 'https://itshello.co/' + timestamp,
                createdAt: new Date(),
                user: {
                  _id: 4,
                  name: 'React Native',
                  avatar: 'https://img.icons8.com/color/452/video-call.png',
                },
              },
            ];
            this.onSend(msg);
          }}
          src="https://img.icons8.com/color/452/video-call.png"
          alt="new"
          style={{width: 40, height: 35}}
        />
      );
    }

    return <Send {...props} />;
  }

  onSend(messages = []) {
   // socket.emit('chat', messages);
   console.log(messages)
    socket.emit('incoming data', messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    if (!auth.loggedIn()) {
      return (
        <Redirect to={{
          pathname: '/login-page',
          state: { error: 'Please login first.' }
        }} />
      );
    }
    const { user } = this.state;
    return (
      <div className="App" style={styles.container}>
        <GiftedChat
          user={{_id: user.id, name: 'React Native',
          avatar: 'https://img.icons8.com/color/452/video-call.png',}}
          renderSend={this.renderSend}
          messages={this.state.messages}
          onSend={this.onSend}
          alwaysShowSend={true}
          isAnimated={true}
          alwaysShowSend={true}
          showAvatarForEveryMessage={true}
        />
      </div>
    );
  }
}
const styles = {
  container: {
    height: '100vh',
    backgroundColor: 'transparent',
    backgroundImage: 'url("../../assets/img/dots.png")',
    backgroundSize: 'contain',
  },
};

export default Chat;
