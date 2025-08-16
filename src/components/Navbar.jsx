
import { useMemo,useState } from "react"
import {Add_new_data_form} from "./Form"

import { useNavigate } from "react-router-dom"

import { FaLinkedin } from "react-icons/fa"
import { FaSignOutAlt } from "react-icons/fa"
import supabase from "../supabaseConnection"

export default function Navbar({form_value, setForm_value, setrefetchData }){

    const navigate = useNavigate()

    const [displayForm, setDisplayForm] = useState(false)

    const defaultInitialValue = useMemo(() => ({}),[]);

    const handleLogout = async ()=>{
        const {logout_error} = await supabase.auth.signOut()

        if(logout_error){
            console.error("Logot Failed !",logout_error.message)
        }
        else{
            console.log("successfully logout")
            navigate("/")
        }
    }
    
            

            

    return(
        <>
        <div className="Navbar_css">
        <div className="Social_media_links">
            <a href="https://www.linkedin.com/in/amit-pandey-tcet" target="_blank" rel="noopener noreferrer" title="Say hi to me on LinkedIn!" > <FaLinkedin className="linkedin-icon" /></a>
                   
                </div>
            <div className="Nav_right">
            <nav style={{display:"flex"}}>
                
                <div  className="add_task_btn" onClick={() => setDisplayForm(true)}>Add Task</div>
      {displayForm && <Add_new_data_form intitalVaue={defaultInitialValue}  form_value={form_value} setForm_value={setForm_value} setrefetchData={setrefetchData}  form_method="post" onClose={() => setDisplayForm(false)}/>}
                    
            </nav>
            <button >
                <FaSignOutAlt className="logout_div" onClick={handleLogout} />
            </button>
            </div>
        </div>
        
        </>
    )
}