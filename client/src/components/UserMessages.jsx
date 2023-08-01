// UserMessages.js
import  { useState } from 'react';
import axios from 'axios';
import Message from './Message';

const UserMessages = () => {
  const [accountId, setAccountId] = useState('');
  const [userMessages, setUserMessages] = useState([]);

  const handleGetMessagesByAccountId = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/accounts/${accountId}/messages`);
      setUserMessages(response.data);
    } catch (error) {
      console.error('Error fetching user messages:', error);
    }
  };

  return (
    <div>
      <h2>Messages by User</h2>
      <input
        type="text"
        placeholder="Account ID"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
      />
      <button onClick={handleGetMessagesByAccountId}>Get Messages</button>
      {userMessages.map((message) => (
        <Message key={message.message_id} message={message} />
      ))}
    </div>
  );
};

export default UserMessages;
