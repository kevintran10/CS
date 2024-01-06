import React, { useState } from 'react';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpStatus, setSignUpStatus] = useState<string | null>(null);

  const handleSignUp = () => {

    if (email && password) {
      setSignUpStatus('Successfully signed up!');
    } else {
      setSignUpStatus('Please provide both email and password.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>

        {signUpStatus && <p>{signUpStatus}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
