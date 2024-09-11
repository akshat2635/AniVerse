'use client';
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext';
export default function Navbar() {
  const { user, logout } = useAuth();
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (e) => {
    const query = e.target.value;
    if (query.length > 0) {
      const res = await fetch(`http://127.0.0.1:5000/get-names?name=${query}`);
      const data = await res.json();
      setResults(data.related);
    } else {
      setResults([]);
    }
  };
  return (   
  <div className="navbar bg-base-300 ">
    <div className="flex-1 navbar-start">
      <h1 className="btn btn-ghost text-xl"><Link href="/">AniVerse</Link></h1>
    </div>
    <div className="flex-1 gap-10 navbar-end">
      <div className="form-control relative">
        <input type="text" className="input input-bordered md:w-80 " 
        onInput={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow clicking on results
        placeholder="Search anime..."
        hx-trigger="keyup changed delay:500ms"
        hx-target="#results"
        hx-swap="innerHTML"
        />
        {isFocused && 
            <ul id="results" className='absolute top-full mt-1 left-0 right-0 bg-black overflow-y-auto z-50 text-white opacity-95 max-h-40 overflow-x-hidden'>
              {Object.entries(results).slice(0,5).map(([id, name]) => (
                <Link href={`/anime/${id}`}><li key={id} className='cursor-pointer p-1 border-black border-y-1'> {name}</li></Link>
              ))}
            </ul>}
      </div>
      {user?<div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a onClick={logout} >Logout</a></li>
        </ul>
      </div>:
      <Link
      className="group relative w-1/6 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      href={"/login"}>
      Sign In
      </Link>
      }
      
    </div>
  </div>
  )
}
