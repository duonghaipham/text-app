import firebase from 'firebase/app';

const SignIn = props => {
  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  }

  return (
    <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
  );
};

export default SignIn;