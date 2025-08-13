
import { useMemo,useState } from "react"
import {insert_data_to_supaabase} from "./Db_query"
import {Add_new_data_form} from "./Form"

import { FaLinkedin } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa"

export default function Navbar({form_value, setForm_value, setrefetchData }){

    const [displayForm, setDisplayForm] = useState(false)

    const defaultInitialValue = useMemo(() => ({}),[]);
            

            

    return(
        <>
        <div className="Navbar_css">
        <div className="Social_media_links">
            <a href="https://www.linkedin.com/in/amit-pandey-tcet" target="_blank" rel="noopener noreferrer" title="Say hi to me on LinkedIn!" > <FaLinkedin className="linkedin-icon" /></a>
                   
                </div>
            <nav>
                
                <div  className="add_task_btn" onClick={() => setDisplayForm(true)}>Add Task</div>
      {displayForm && <Add_new_data_form intitalVaue={defaultInitialValue}  form_value={form_value} setForm_value={setForm_value} setrefetchData={setrefetchData}  form_method="post" onClose={() => setDisplayForm(false)}/>}
                    
            </nav>
        </div>
        
        </>
    )
}