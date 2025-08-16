import supabase from "../supabaseConnection"


export async function get_data_from_Supabase(){

    const { data: { session }, session_error } = await supabase.auth.getSession();

    if (session_error || !session?.user) {
        console.error("User session not found", session_error);
        return [];
    }

    const userID = session.user.id;
    // console.log("userID:", userID);

    const { data, error, status }  = await supabase.from("test_project_1").select().eq('user_id',userID).order('created_at', {ascending: false}) // to get latest data at TOP
    localStorage.setItem("taskList", JSON.stringify(data));

    return data

}



export async function delete_from_Supabase(id){

    const { data, error, status }  = await supabase.from("test_project_1").delete().eq("id",id)

    return data.status
    //if status is 204 is means successfully deleted 

}

export async function insert_data_to_supaabase({form_value, setForm_value,setrefetchData }){

    const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
    
      if (sessionError || !session?.user) {
        console.error("User session not found:", sessionError);
        return;
      }
    
      const userID = session.user.id;

    if(form_value.important === ""){
        form_value.important= false
    }
    if(form_value.urgent === ""){
        form_value.urgent= false
    }

    if(form_value.title === ""){
        window.alert("Please add the Task Title")
    }else{
        const {error} = await supabase.from("test_project_1").insert(
            {   title:form_value.title,
                description:form_value.description,
                is_important:form_value.important,
                is_urgent:form_value.urgent,
                user_id: userID 
            })
        
            if(error){
                console.warn("Error while inserting data: ",error)
            }

        setForm_value({
            title:"",
            description:"",
            important : "",
            urgent : ""
        })

        setrefetchData((prev)=>prev +1 )
    }

}

// export async function update_data_to_supaabase( id){
//     event.preventDefault()

//     if(form_value.title === ""){
//         window.alert("Title Should not be empty")
//     }else{

//         const {error} = await supabase.from("test_project_1").update(
//             {   title:form_value.title,
//                 description:form_value.description,
//                 is_important:form_value.important,
//                 is_urgent:form_value.urgent }
//         ).eq("id", id)
//     }

//     setForm_value({
//          title:"",
//          description:"",
//          important:"",
//          urgent:""
//     })

//     setrefetchData((prev)=>prev+1)

// }

export default {
    get_data_from_Supabase,
    delete_from_Supabase,
    insert_data_to_supaabase,
    // update_data_to_supaabase
  }
