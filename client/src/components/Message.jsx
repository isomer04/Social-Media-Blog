const Message = ({ message }) => {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded shadow mb-4">
      <p className="text-lg mb-1">{message.message_text}</p>
      <p className="text-gray-600 text-sm mb-1">Posted by: {message.posted_by}</p>
      <p className="text-gray-600 text-sm">Posted at: {message.time_posted_epoch}</p>
    </div>
  );
};

export default Message;
