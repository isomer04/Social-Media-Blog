import { useState } from 'react';
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
    <div className="mb-4">
      <h2 className="text-xl mb-2">Messages by User</h2>
      <div className="flex mb-2">
        <input
          type="text"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="p-2 border border-gray-300 rounded-l"
        />
        <button
          onClick={handleGetMessagesByAccountId}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Get Messages
        </button>
      </div>
      {userMessages.map((message) => (
        <Message key={message.message_id} message={message} />
      ))}
    </div>
  );
};

export default UserMessages;
