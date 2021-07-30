import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';

import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';

import {firebaseConfig} from './api';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className='App'>
      <div>
        {(user) ?
          <ChatRoom auth={auth} firestore={firestore} /> :
          <SignIn auth={auth} firestore={firestore} />}
      </div>
    </div>
  );
};

export default App;