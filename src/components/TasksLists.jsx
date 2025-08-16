import supabase from "../supabaseConnection"
import { FaTrash } from "react-icons/fa";


export function Display_all_task_as_list( { task_data, setrefetchData }){


    return (
        <div  className="left_container">
            <div className="left_container_title">All task's</div>
            <div className="task_list_to_edit">
            {Array.isArray(task_data) && task_data.map((item)=>{
                return (
                    <div className="item_array" style={{display:"flex", justifyContent:"space-between", gap:"10px", padding:"5px"}} key={item.id}>
                        
                        <p>● {item.title}</p>
                        <button style={{cursor:"pointer"}} onClick={async ()=> { await supabase.from("test_project_1").delete().eq("id",item.id); setrefetchData((prev)=> prev+1) }} ><FaTrash /></button>
                        
                    </div>
                )
            } )}
            </div>
        </div>
    )
}