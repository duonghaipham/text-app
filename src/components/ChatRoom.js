import firebase from 'firebase/app';

import {useCollectionData} from 'react-firebase-hooks/firestore';
import {useState} from 'react';

import ChatMessage from './ChatMessage';

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
    <>
      {props.auth.currentUser && <button onClick={() => props.auth.signOut()}>Sign out</button>}
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={props.auth} />)}
      </div>
      <form onSubmit={handleSendMessage}>
        <input type='text' onChange={event => setFormValue(event.target.value)} />
        <button type='submit'>Send</button>
      </form>
    </>
  );
};

export default ChatRoom;