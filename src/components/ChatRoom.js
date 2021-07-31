import firebase from 'firebase/app';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {useState, useRef, useEffect} from 'react';
import ChatMessage from './ChatMessage';
import firebaseIcon from '../assets/svg/firebase.svg';
import reactIcon from '../assets/svg/react.svg';
import '../styles/chatroom.css';

const ChatRoom = props => {
  const messageRef = props.firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limitToLast(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');
  const last = useRef();

  const handleSendMessage = async(event) => {
    event.preventDefault();
    const {uid, photoURL} = props.auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    last.current.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    last.current.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <div className='chat-room'>
      <div className='fixed header'>
        <ul className='label'>
          <li><img src={firebaseIcon} alt='Firebase' width='32px' /></li>
          <li><img src={reactIcon} alt='ReactJS' width='55px' /></li>
        </ul>
        {props.auth.currentUser && <button onClick={() => props.auth.signOut()} className='btn-sign-out'>Sign out</button>}
      </div>
      <div className='list-messages'>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={props.auth} />)}
        <span ref={last}></span>
      </div>
      <form onSubmit={handleSendMessage} className='fixed form-sender'>
        <input type='text' onChange={event => setFormValue(event.target.value)} value={formValue} className='type' />
        {formValue && <button type='submit' className='btn-send'><i className='fa fa-send' /></button>}
      </form>
    </div>
  );
};

export default ChatRoom;