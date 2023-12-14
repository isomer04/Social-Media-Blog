import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MessageForm from './MessageForm';
import Message from './Message';

const Homepage = () => {
  const { username } = useParams();
  const [userId, setUserId] = useState(null);
  const [userMessages, setUserMessages] = useState([]);

  console.log('Homepage - username:', username);


  useEffect(() => {
    fetchUserIdByUsername();
  }, []);

  const fetchUserIdByUsername = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/accounts/username/${username}/userId`);
      console.log('fetchUserIdByUsername Response:', response.data);
      setUserId(response.data.userId);
      fetchUserMessages(response.data.userId);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };
  


  const fetchUserMessages = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/accounts/${userId}/messages`);
      console.log('fetchUserMessages Response:', response.data);
      setUserMessages(response.data);
    } catch (error) {
      console.error('Error fetching user messages:', error);
    }
  };
  

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hi {username}</h2>
      <MessageForm userId={userId} />
      <h3 className="text-lg font-semibold mt-4">Your Messages</h3>
      {userMessages.map((message) => (
        <Message key={message.message_id} message={message} />
      ))}
    </div>
  );
};

export default Homepage;
