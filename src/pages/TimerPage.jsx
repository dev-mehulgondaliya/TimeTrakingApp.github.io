import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import TaskListPage from './TaskListPage';

function TimerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // Use a numerical value for time
  const [showModal, setShowModal] = useState(false);
  const [savedTask, setSavedTask] = useState([]);
  const [updateDataIndex, setUpdateDataIndex] = useState(null)
  const [EditData, setEditData] = useState(null);

  // for getting data frmo localstorage
  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem('savedTask')) || [];
    setSavedTask(storedTask);
  }, []);


  // for stopwatch timer
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);


  // for task-list clear
  const clearList = () => {
    JSON.parse(localStorage.getItem([]));
    setSavedTask([]);
  }

  // for timer start/pause
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // for reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };


  // for save data to localstorage
  const saveTime = () => {
    setShowModal(true);
  };

  // for closing modal
  const closeModal = () => {
    setUpdateDataIndex(null);
    setEditData(null);
    setShowModal(false);
  };


  // for edit button click event
  const handleEdit = (index) => {
    setUpdateDataIndex(index);
    setEditData(savedTask[index])
    setShowModal(true);
  }

  // for perticular data delete (index wise)
  const handleDelete = (index) => {
    const updatedTaskList = [...savedTask];
    updatedTaskList.splice(index, 1);
    setSavedTask(updatedTaskList);
    localStorage.setItem('savedTask', JSON.stringify(updatedTaskList));
  }

  // for show formated time (HH:mm:ss)
  const formatTime = (milliseconds) => {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // for data save of modal (this funtion use for both edit and save)
  const handleSave = (title, description, currentTime) => {
    if (updateDataIndex != null) {
      const updatedTaskList = [...savedTask];
      updatedTaskList.splice(updateDataIndex, 1, { title, description, time: savedTask[updateDataIndex].time });
      setSavedTask(updatedTaskList);
      localStorage.setItem('savedTask', JSON.stringify(updatedTaskList));
      setUpdateDataIndex(null)
      setEditData(null)
      setShowModal(false);
    } else {

      const newTimeEntry = { title, description, time: currentTime };
      setSavedTask((prevTimes) => [...prevTimes, newTimeEntry]);
      localStorage.setItem('savedTask', JSON.stringify([...savedTask, newTimeEntry]));
      setShowModal(false);
    }

  };

  return (
    <div className='flex flex-col gap-10'>
      <h1 className='text-2xl text-purple-500'>Time Tracking App</h1>
      <p className='text-7xl font-bold '>{formatTime(time)}</p>
      <div className='flex gap-5 justify-center'>
        <button className='bg-blend-darken' onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
        <button className='bg-blend-darken' onClick={resetTimer}>Reset</button>
        <button className='bg-blend-darken' onClick={saveTime}>Save</button>
        <button className='bg-blend-darken' onClick={clearList}>Clear List</button>
      </div>
      {showModal && <Modal onSave={handleSave} time={time} onClose={closeModal} EditData={EditData} updateDataIndex={updateDataIndex} />}
      <TaskListPage savedTask={savedTask} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
}

export default TimerPage;
