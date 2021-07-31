import firebase from 'firebase/app';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {useState} from 'react';
import ChatMessage from './ChatMessage';
import '../styles/chatroom.css';

const ChatRoom = props => {
  const messageRef = props.firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const handleSendMessage = async(event) => {
    event.preventDefault();
    const {uid, photoURL} = props.auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
  };

  return (
    <div className='chat-room'>
      {props.auth.currentUser && <button onClick={() => props.auth.signOut()} className='btn-sign-out'>Sign out</button>}
      <div className='list-messages'>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={props.auth} />)}
      </div>
      <form onSubmit={handleSendMessage} className='form-sender'>
        <input type='text' onChange={event => setFormValue(event.target.value)} className='type' />
        <button type='submit' className='btn-send'><i className='fa fa-send' /></button>
      </form>
    </div>
  );
};

export default ChatRoom;