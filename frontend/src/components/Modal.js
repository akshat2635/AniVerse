import React, { useEffect, useRef } from 'react';

export default function Modal({ showModal, head, msg, link_msg, onClose }) {
  const modalRef = useRef(null);

  // Open or close the modal based on showModal prop
  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [showModal]);

  // Handle the button click to close the modal
  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent default button behavior
    onClose(); // Call the onClose function passed as a prop
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
