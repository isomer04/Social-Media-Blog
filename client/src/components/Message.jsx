import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Message = ({ message, currentUserId, onUpdate, onDelete }) => {
  const { username } = useParams();

  const handleUpdate = () => {
    console.log('Update message:', message);
    onUpdate(message);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/messages/${message.message_id}`);
      onDelete(message.message_id);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const canEditAndDelete = currentUserId === message.posted_by;

  return (
    <div className="bg-white p-4 border border-gray-300 rounded shadow mb-4">
      <p className="text-lg mb-1">{message.message_text}</p>
      
      {/* Conditionally render posted_by based on the pathname */}
      {username && (
        <p className="text-gray-600 text-sm mb-1">
          Posted by: {username || message.posted_by}
        </p>
      )}
      
      <p className="text-gray-600 text-sm">
        Posted at: {new Date(message.time_posted_epoch * 1000).toLocaleString()}
      </p>

      {canEditAndDelete && (
        <div className="flex mt-2">
          <button onClick={handleUpdate} className="text-white hover:text-blue-700 mr-2">
            Update
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;
