import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import TimerPage from '../pages/TimerPage'
import TaskListPage from '../pages/TaskListPage'

function RouterPage() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<TimerPage />}></Route>
        <Route path='/*' element={<TimerPage />}></Route>
      </Routes>
    </HashRouter>
  )
}

export default RouterPage