'use client';
import React,{useState} from 'react'
import Link from 'next/link'
// import { UserAuth } from "../app/context/AuthContext";
export default function Navbar() {
  // const { user, googleSignIn, logOut } = UserAuth();
  // const [loading, setLoading] = useState(true);

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
  // console.log(results)

  // const handleSignIn = async () => {
  //   try {
  //     await googleSignIn();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSignOut = async () => {
  //   try {
  //     await logOut();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 50));
  //     setLoading(false);
  //   };
  //   checkAuthentication();
  // }, [user]);

  // console.log(user)
  return (
    <div >
        <ul className='flex justify-between content-center border-b-2 p-4'>
            <li className='font-bold font-serif text-xl px-3 mx-10'><Link href="/">AniVerse</Link></li>
            <li className='mx-28'>
              <input
            type="text"
            className='text-black rounded-md px-3 w-full'
            onInput={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow clicking on results
            placeholder="Search anime..."
            hx-trigger="keyup changed delay:500ms"
            hx-target="#results"
            hx-swap="innerHTML"
          />
          {isFocused && 
          <ul id="results" className='bg-black overflow-y-auto z-50 text-white opacity-80 overflow-x-hidden'>
            {Object.entries(results).slice(0,5).map(([id, name]) => (
              <Link href={`/anime/${id}`}><li key={id} className='cursor-pointer p-1 border-black border-y-1'> {name}</li></Link>
            ))}
          </ul>}

            </li>
            {/* {!user?
            (<li className='cursor-pointer' onClick={handleSignIn}> Sign In</li>) 
            :(<>
            <Link href='/profile' className='flex content-center justify-center'>
              <li className='font-semibold font-sans text-base' >{user.displayName}</li>
              <li><img className='rounded-full size-5 mx-2 mt-1' src={user.photoURL} alt="dp" /></li>
            </Link>
              <li className='cursor-pointer' onClick={handleSignOut}> Sign Out</li>
            </>
            )
             } */}
            {/* <li className='cursor-pointer' onClick={handleSignIn}>{user? user.displayName : 'Sign In'}</li> */}

        </ul>
    </div>
  )
}
