import React from 'react'
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'
import AddSchedules from './AddSchedules'
import UpdateSchedule from './UpdateSchedule'
import Heading from './Heading'
import Todolist from './Todolist'
import Login from './Components/Login'
import Signup from './Components/Signup'
import DashBoard from './Components/DashBoard'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <BrowserRouter>  
      <Heading />
      <ToastContainer />
        <Routes>
          <Route path='/Todolist' element={<Todolist />}></Route>
          <Route path='/AddTask' element={<AddSchedules />}></Route>
          <Route path='/UpdateTask/:id' element={<UpdateSchedule />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/' element={<DashBoard />}></Route>

        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
