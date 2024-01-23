import React from 'react';

function TaskListPage({ savedTask, handleEdit, handleDelete }) {
  return (
    <>
      <div className='flex flex-col border gap-5 rounded p-3'>
        <h2>Saved Task List</h2>
        <ul className='flex flex-col gap-2 max-h-[500px] min-h-[300px] overflow-y-auto'>
          {savedTask && savedTask.length > 0 ? savedTask.map((entry, index) => (
            <div key={index} className='flex gap-3 flex-col text-start bg-[#3B495E] border p-1 rounded'>
              <div className='flex justify-between w-full items-center'>
                <div className=' flex flex-col'>
                  <span className='font-semibold'>{entry.title}</span>
                  <span className='text-sm'>{entry.time}</span>
                </div>
                <div className='flex gap-2'>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
              <hr />
              <div>
                <span>Description :</span>
                <div className='max-w-[300px] text-wrap'>
                  {entry.description}
                </div>
              </div>
            </div>
          )) :
            <div className='p-3'>
              <p className='text-red-400'>No any saved task</p>
            </div>
          }
        </ul>
      </div>
    </>
  );
}

export default TaskListPage;
