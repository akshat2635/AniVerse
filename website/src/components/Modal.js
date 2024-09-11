'use client';
import React, { useEffect, useRef } from 'react';

export default function Modal({ showModal, head, msg, link_msg, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [showModal]);

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent default button behavior
    onClose();
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{head}</h3>
        <p className="py-4">{msg}</p>
        <div className="modal-action">
          <button className="btn" onClick={handleButtonClick}>{link_msg}</button>
        </div>
      </div>
    </dialog>
  );
}
