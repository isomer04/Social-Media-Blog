import  { useState, useEffect } from 'react';

const UpdateMessageModal = ({ onUpdate, onClose, selectedMessage, setSelectedMessage }) => {
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    setUpdatedText(selectedMessage.message_text);
  }, [selectedMessage]);

  const handleUpdateClick = () => {
    onUpdate(updatedText);
    onClose();
    setSelectedMessage(null); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Message</h2>
        <textarea
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
        <button onClick={handleUpdateClick}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};


export default UpdateMessageModal;