import { useEffect,useState,useRef } from "react"
import { insert_data_to_supaabase } from "./Db_query"



export function Add_new_data_form( { intitalVaue={},form_method="post", form_value, setForm_value, setrefetchData , onClose}){

    const overlayRef=useRef(null)
    const formRef=useRef(null)


    useEffect(()=>{
        const intitalVaue_length = Object.keys(intitalVaue).length > 0

        if(intitalVaue_length){
            setForm_value(prev =>({ ...prev, ...intitalVaue}));
        }
        
    },[intitalVaue, setForm_value])

    useEffect(() => {
        const handleClickOutside = (event) => {
          // If clicked outside formContent
          if (
            overlayRef.current &&
            !formRef.current.contains(event.target)
          ) {
            onClose(); // Call the function to close the form
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [onClose]);

      const handleSubmit = (event) => {
        event.preventDefault(); // prevent form reload
        insert_data_to_supaabase({form_value , setForm_value, setrefetchData});
        onClose();

      };


    return (
        <>
        <div className="form-parent" ref={overlayRef} >
        <form className="form-container" ref={formRef} method={form_method} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add Task"
                        value={form_value.title}
                        onChange={(e) => setForm_value({ ...form_value, title: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Add Description (optional)"
                        value={form_value.description}
                        onChange={(e) => setForm_value({ ...form_value, description: e.target.value })}
                    />

                    <label>Is this task Important?</label>
                    <select
                        value={form_value.important}
                        onChange={(e) => setForm_value({ ...form_value, important: e.target.value })}
                    >
                        <option disabled value="">Is Important</option>
                        <option value="True">Yes</option>
                        <option value="False">No</option>
                    </select>

                    <label>Is this task Urgent?</label>
                    <select
                        value={form_value.urgent}
                        onChange={(e) => setForm_value({ ...form_value, urgent: e.target.value })}
                    >
                        <option disabled value="">Is Urgent</option>
                        <option value="True">Yes</option>
                        <option value="False">No</option>
                    </select>

                    <input type="submit" value="Add to List" />
                    </form>
                </div>
        </>
    )

}