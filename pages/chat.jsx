import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { textAreas,textAreas2,chatPage,styleOtherButtons } from '../components/SharedStyles';



import withAuth from '../lib/withAuth';
let socket;

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};
const defaultProps = {
  user: null,
};

/*You would not believe how long it took me to realize that I could do it this way and not some convoluted solution for the google auth*/
 function Index({ user }) { 
  const [username, setUsername] = useState('');
  const [chosenUsername, setChosenUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  

  useEffect(() => {
    socketInitializer();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('newIncomingMessage', (msg) => {
      setMessages((currentMsg) => [...currentMsg, { author: msg.author, message: msg.message }]);
    });
  };

  const sendMessage = async () => {
    socket.emit('createdMessage', { author: chosenUsername, message });
    setMessages((currentMsg) => [...currentMsg, { author: chosenUsername, message }]);
    setMessage('');
  };

  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <div  style={chatPage}>
        <Head>
          <title>Chat!</title>
          <meta name="description" content="Chatter" />
          <link rel="icon" href="https://img.icons8.com/ios-glyphs/30/null/filled-chat.png" /> 
        </Head>
      <main>
        {!chosenUsername ? (
          <>
          <h1>Chatter!</h1>
            <h3>Please choose a username</h3>
            <input style={textAreas}
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button style={styleOtherButtons}
              onClick={() => {
                setChosenUsername(username);
              }}
            >
              Join!
            </button>
          </>
        ) : (
          <>
          <h1>Welcome to the Chat!</h1>
            <p>Your username: {username}</p>
            <div>
              <div>
                {messages.map((msg, i) => {
                  return (
                    <div key={i}>
                      {user.email} : {msg.author} : {msg.message}
                    </div>
                  );
                })}
              </div>
              <div>
                <input style={textAreas2}
                  type="text"
                  placeholder="New message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div>
                  <button type style={styleOtherButtons}
                    
                    onClick={() => {
                      sendMessage();
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);