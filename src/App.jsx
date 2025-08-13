import { useEffect, useState } from 'react'
import './App.css'

import {Display_all_task_as_list} from "./components/TasksLists"
import {Fun_display_matrix} from "./components/Display_tasks"
import { get_data_from_Supabase } from './components/Db_query'
import Navbar from "./components/Navbar"

function App() {


  const [task_data, setTask_Data] = useState([])
  const [refetchData, setrefetchData] = useState(0)
  const [form_value, setForm_value] = useState({
    title: "",
    description: "",
    important : "",
    urgent : ""
    })

  useEffect(()=>{

    async function fetchData(){
      const data = await get_data_from_Supabase()
      setTask_Data(data || [])
    }
    fetchData()

  },[refetchData])




  return (
     <>
     <Navbar form_value={form_value} setForm_value={setForm_value} setrefetchData={setrefetchData}  />
     <div className="parent_container">
        <Display_all_task_as_list task_data={task_data} setrefetchData={setrefetchData} />
        <Fun_display_matrix task_data={task_data} setrefetchData={setrefetchData}  />
     </div>
     </>
  )
}

export default App
