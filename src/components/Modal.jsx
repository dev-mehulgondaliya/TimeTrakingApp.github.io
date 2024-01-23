// Modal.js
import React, { useState } from 'react';

const Modal = ({ onSave, onClose, EditData, updateDataIndex }) => {
  const [title, setTitle] = useState(EditData ? EditData.title : '');
  const [description, setDescription] = useState(EditData ? EditData.description : '');


  // for save button click event handle
  const handleSave = () => {
    if (title.trim() && description.trim()) {

      onSave(title, description);
      setTitle('');
      setDescription('');
    }
  };


  return (
    <div className="modal border-white border p-2 ">
      <div className="modal-content flex flex-col gap-2 text-start">
        <div className='flex justify-between items-center'>
          <h2>Save Task</h2>
          <span className="close px-2 hover:text-red-400 duration-200 cursor-pointer text-2xl" onClick={onClose}>
            &times;
          </span>
        </div>
        <label>Title:</label>
        <input type="text" value={title} className='p-2 rounded bg-[#EAECEE] text-[#161C26]' onChange={(e) => setTitle(e.target.value)} readOnly={updateDataIndex != null && true} />
        <label>Description:</label>
        <textarea type="text" value={description} className='p-2 bg-[#EAECEE] resize-none text-[#161C26]' rows={3} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
