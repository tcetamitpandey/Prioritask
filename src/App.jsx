import { useState } from 'react'
import './App.css'

import {Display_all_task_as_list} from "./components/TasksLists"
import {Fun_display_matrix} from "./components/Display_tasks"
import Navbar from "./components/Navbar"
import LoginForm from './components/Auth_page'
import ProtectedRoute from './components/ProtectedRoute'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {


  const [task_data, setTask_Data] = useState([])
  const [refetchData, setrefetchData] = useState(0)
  const [form_value, setForm_value] = useState({
    title: "",
    description: "",
    important : "",
    urgent : ""
    })



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute refetchData={refetchData}  setrefetchData={setrefetchData} setTask_Data={setTask_Data} >
              <>
                <Navbar
                  form_value={form_value}
                  setForm_value={setForm_value}
                  setrefetchData={setrefetchData}
                />
                <div className="parent_container">
                  <Display_all_task_as_list
                    task_data={task_data}
                    setrefetchData={setrefetchData}
                  />
                  <Fun_display_matrix
                    task_data={task_data}
                    setrefetchData={setrefetchData}
                  />
                </div>
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
