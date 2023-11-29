import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ sessionID, firstQuestion }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // When the component mounts, add the first question to the messages list
    if (firstQuestion) {
      setMessages([{ text: firstQuestion, sender: 'bot' }]);
    }
  }, [firstQuestion]);

  const sendMessage = async () => {
    setMessages(prevMessages => [...prevMessages, { text: userInput, sender: 'user' }]);
    try {
      const response = await fetch('http://127.0.0.1:5000/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            session_id: sessionID,
            conversationID: 'test_conversation1',
            user_input: userInput,
            api_key: '2555|Nnnapt4vFBQttLFHtJj3pjp0SWODuYyIONjqJHus'
        }),
      });

      const responseData = await response.json();
      setMessages(prevMessages => [...prevMessages, { text: responseData.response, sender: 'bot' }]); //text: response.data.response
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // useEffect(() => {
  //   // Implement logic to fetch initial messages or create a new conversation
  // }, []);

  return (
    <div style={styles.chatContainer}>
      <MessageList messages={messages} />
      <MessageInput
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onSend={sendMessage}
      />
    </div>
  );
};

const styles = {
    chatContainer: {
      width: '600px',
      height: '100vh',
      backgroundColor: '#FFFFFF', // White
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '20px',
    },
  };

export default Chat;

