import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replacing useRouter
import Modal from './Modal';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate(); // Using useHistory from react-router-dom

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);

    // Check if passwords match before sending data
    if (!passwordMatch) {
      setMessage('Passwords do not match');
      setIsError(true);
      return;
    }

    try {
      const response = await fetch('https://aniverse-backend-3gqz.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          email: email,
          pwd: password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setIsError(false);
        setTimeout(() => {
          navigate('/login'); // Using history for navigation
        }, 5000);
      } else {
        setMessage(data.message || 'Registration failed');
        setIsError(true);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred: ' + error.message);
      setIsError(true);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen overflow-y-hidden'>
      <div className="max-w-lg w-full">
        <div
          style={{boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"}}
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Welcome to Aniverse
            </h2>
            <p className="mt-4 text-center text-gray-400">Sign up to continue</p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="username">Username</label>
                  <input
                    placeholder="Username"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="username"
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className='mt-4'>
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <input
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="re-password">Re-enter Password</label>
                  <input
                    placeholder="Confirm Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="Confirm password"
                    type="password"
                    name="re-password"
                    id="re-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
              </div>

              {(passwordMatch !== null && password.length !== 0) && (
                <div className={`mt-4 text-center ${passwordMatch ? 'text-green-500' : 'text-red-500'}`}>
                  {passwordMatch ? '' : 'Passwords do not match'}
                </div>
              )}
                {message && (
                <div className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </div>
              )}
              <div className="mt-4">
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                  disabled={!passwordMatch}>
                  Sign Up
                </button>
                <Modal showModal={showModal} head={isError?"Error":"Success"} msg={message} link_msg={isError?'Try Again':"Go To Login"} onClose={() => {setShowModal(false); !isError?navigate('/login'):navigate('/register');}} />
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Already have an account?</span>
            <a className="font-medium text-indigo-500 hover:text-indigo-400" href="/login"> Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}
