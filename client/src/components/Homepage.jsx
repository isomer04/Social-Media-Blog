import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MessageForm from './MessageForm';
import Message from './Message';
import UpdateMessageModal from './UpdateMessageModel';


const Homepage = () => {
  const { username } = useParams();
  const [userId, setUserId] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  console.log('Homepage - username:', username);


  useEffect(() => {
    fetchUserIdByUsername();
  }, []);

  const fetchUserIdByUsername = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/accounts/username/${username}/userId`);
      console.log('fetchUserIdByUsername Response:', response.data);
      setUserId(response.data);  
      fetchUserMessages(response.data);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };
  

  const fetchUserMessages = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/accounts/${userId}/messages`);
      console.log('fetchUserMessages Response:', response);
      setUserMessages(response.data);
    } catch (error) {
      console.error('Error fetching user messages:', error);
    }
  };

  const handleUpdateMessage = async (updatedText) => {
    try {
      const response = await axios.patch(`http://localhost:8080/messages/${selectedMessage.message_id}`, {
        message_text: updatedText,
      });

      console.log('Update message response:', response.data);

      // If the update is successful, fetch the updated messages
       fetchUserMessages(userId);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  
  const handleCreateMessage = async (newMessage) => {
    setUserMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:8080/messages/${messageId}`);
      // If the deletion is successful, update the messages
      fetchUserMessages(userId);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };
  

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hi {username}</h2>
      <MessageForm userId={userId} onCreateMessage={handleCreateMessage} />
      <h3 className="text-lg font-semibold mt-4">Your Messages</h3>
      {Array.isArray(userMessages) && userMessages.length > 0 ? (
        userMessages.map((message) => (
          <Message
            key={message.message_id}
            message={message}
            currentUserId={userId}
            onUpdate={() => openModal(message)}
            onDelete={handleDeleteMessage}
          />
        ))
      ) : (
        <p>No messages found.</p>
      )}

      {isModalOpen && (
        <UpdateMessageModal onUpdate={handleUpdateMessage} onClose={closeModal} selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} />
      )}
    </div>
  );
};

export default Homepage;