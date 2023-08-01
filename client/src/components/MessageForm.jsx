// MessageForm.js
import  { useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
  const [messageText, setMessageText] = useState('');

  const handleCreateMessage = async () => {
    try {
      const response = await axios.post('http://localhost:8080/messages', {
        message_text: messageText,
      });
      console.log('Message created:', response.data);
      // Handle success, update message list, etc.
    } catch (error) {
      console.error('Message creation failed:', error.response.data);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Post a New Message</h2>
      <textarea
        placeholder="Enter your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={handleCreateMessage}>Post</button>
    </div>
  );
};

export default MessageForm;
