import React, { useState } from 'react';
import Chat from './Chat';

const App = () => {
  const [conversationStarted, setConversationStarted] = useState(false);
  const [sessionID, setSessionID] = useState('');
  const [response, setResponse] = useState('');

  const startConversation = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/create_conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationID: 'test_conversation1', 
          api_key: '2555|Nnnapt4vFBQttLFHtJj3pjp0SWODuYyIONjqJHus',
          project_url: "https://app.customgpt.ai/api/v1/projects/14857/conversations",

        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSessionID(responseData.session_id);
        setResponse(responseData.response);
        setConversationStarted(true);
      } else {
        console.error('Failed to create conversation:', responseData.error);
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  return (
    <div style={styles.container}>
      {!conversationStarted ? (
        <button style={styles.startButton} onClick={startConversation}>
          Talk to Aimee
        </button>
      ) : (
        <Chat sessionID={sessionID} firstQuestion={response}/>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  startButton: {
    width: '250px',
    height: '75px',
    backgroundColor: '#ADD8E6', // Light Blue
    color: '#000080', // Dark Blue
    fontSize: '18px',
    borderRadius: '5px',
  },
};

export default App;

