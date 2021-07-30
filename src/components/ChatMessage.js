const ChatMessage = props => {
  const {text, uid, photoURL} = props.message;
  const messageClass = uid === props.auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt='Avatar' />
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;