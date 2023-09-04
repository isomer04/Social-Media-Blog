import { useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
  const [messageText, setMessageText] = useState('');

  const handleCreateMessage = async () => {
    const trimmedMessageText = messageText.trim();

    try {
      const response = await axios.post('http://localhost:8080/messages', {
        message_text: trimmedMessageText,
        posted_by: 1,
        time_posted_epoch: Math.floor(Date.now() / 1000)

      });
      console.log('Message created:', response.data);
      // Handle success, update message list, etc.
    } catch (error) {
      console.error('Message creation failed:', error.response.data);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="bg-white p-4 border border-gray-300 rounded shadow mb-4">
      <h2 className="text-xl mb-2">Post a New Message</h2>
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Enter your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
        onClick={handleCreateMessage}
      >
        Post
      </button>
    </div>
  );
};


export default MessageForm;
