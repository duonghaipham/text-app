import firebase from 'firebase/app';
import search from '../assets/svg/search.svg';
import '../styles/signin.css';

const SignIn = props => {
  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  }

  return (
    <div className='sign-in'>
      <h1>Sign in to continue</h1>
      <button onClick={handleSignInWithGoogle} className='btn-sign-in'>
        <div className='icon'><img src={search} alt='Google icon' className='img' /></div>
        <div className='text'>Sign in with Google</div>
      </button>
    </div>
  );
};

export default SignIn;