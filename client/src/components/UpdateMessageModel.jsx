import React, { useState } from 'react';

const UpdateMessageModal = ({ onUpdate, onClose }) => {
  const [updatedText, setUpdatedText] = useState('');

  const handleUpdateClick = () => {
    onUpdate(updatedText);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <label>
          Updated Message Text:
          <input type="text" value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} />
        </label>
        <button onClick={handleUpdateClick}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateMessageModal;