'use client'
// import { useRouter } from 'next/navigation';
import React from 'react'

export default function Modal({showModal,head,msg,link_msg,onClose}) {
    // const router=useRouter()
    if (!showModal) return null;
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
        {/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{head}</h3>
            <p className="py-4">{msg}</p>
            <div className="modal-action">
                <button className="btn" onClick={onClose}>{link_msg}</button>
            </div>
        </div>
        </dialog>
    </div>
  )
}
