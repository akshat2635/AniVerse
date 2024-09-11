"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const {login}=useAuth();

    const router=useRouter();
    const handleModalClose = () => {
      setShowModal(false); // Close the modal
      if (!isError) {
        router.push('/'); // Navigate if not an error
      }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
    
        try {
          const response = await fetch('http://localhost:6969/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: username,
              pwd: password
            }),
          });
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            // Handle successful response
            // console.log('Registration successful');
            setMessage(data.message);
            setIsError(false);
            login(data.accessToken);
            setTimeout(() => {
                router.push('/');
              }, 5000);
          } else {
            // Handle error response
            setMessage(data.message || 'Login failed');
            setIsError(true);
            // console.log(data.message);
          }
        } catch (error) {
          console.error('An error occurred:', error);
          setMessage('An error occurred: ' + error.message);
          setIsError(true);
        }
        setShowModal(true);
        // document.getElementById('my_modal_5').showModal();
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
                Welcome Back
            </h2>
            <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
            <form method="POST" action="/" className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm">
                <div>
                    <label className="sr-only" htmlFor="username">Username</label>
                    <input
                    placeholder="Username"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required=""
                    autocomplete="username"
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <label className="sr-only" htmlFor="password">Password</label>
                    <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required=""
                    autocomplete="current-password"
                    type={show?"text":"password"}
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                    <input
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    onChange={(e)=>setRemember(e.target.checked)}
                    />
                    <label className="ml-2 block text-sm text-gray-400" htmlFor="remember-me">Remember me</label>
                </div>
                <div className="flex items-center">
                    <input
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                    type="checkbox"
                    name="show-pwd"
                    id="show-pwd"
                    onChange={(e)=>setShow(e.target.checked)}
                    />
                    <label className="ml-2 block text-sm text-gray-400" htmlFor="remember-me">Show Password</label>
                </div>

                {/* <div className="text-sm">
                    <a
                    className="font-medium text-indigo-500 hover:text-indigo-400"
                    href="/"
                    >
                    Forgot your password?
                    </a>
                </div> */}
                </div>
                <div>
                <button
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit">
                    Sign In
                </button>
                <Modal showModal={showModal} head={isError?"Error":"Success"} msg={message} link_msg={isError?'Try Again':"Go To Home"} onClose={handleModalClose} />
                </div>
            </form>
            </div>
            <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Don't have an account?</span>
            <a className="font-medium text-indigo-500 hover:text-indigo-400" href="/register">Sign up</a>
            </div>
        </div>
        </div>
    </div>
  )
}
