import React from 'react';
import axios from 'axios';

const Message = ({ message, currentUserId, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    // Add your logic for handling the update here
    console.log('Update message:', message);
    onUpdate(message);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/messages/${message.message_id}`);
      // If the deletion is successful, notify the parent component to update the messages
      onDelete(message.message_id);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const canEditAndDelete = currentUserId === message.posted_by;

  return (
    <div className="bg-white p-4 border border-gray-300 rounded shadow mb-4">
      <p className="text-lg mb-1">{message.message_text}</p>
      <p className="text-gray-600 text-sm mb-1">Posted by: {message.posted_by}</p>
      <p className="text-gray-600 text-sm">Posted at: {message.time_posted_epoch}</p>

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
