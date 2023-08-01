// Message.js

const Message = ({ message }) => {
  return (
    <div>
      <p>{message.message_text}</p>
      <p>Posted by: {message.posted_by}</p>
      <p>Posted at: {message.time_posted_epoch}</p>
    </div>
  );
};

export default Message;
