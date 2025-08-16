

export function Fun_display_matrix({ task_data, setrefetchData }){



    return (
        < div className="right_container">
            <div className="matrixContainer" >

                <div className="matrix_div_container">
                    <div className="matrix_title">Important & Urgent</div>
                    <div className="imp_urgent">
                           
                            {task_data.filter( (item)=> item.is_urgent && item.is_important ).map( (item)=>{
                                return(
                                    <div key={item.id} >● {item.title}</div>
                                )
                            } ) }
                    </div>
                </div>
                    
                <div className="matrix_div_container">
                <div className="matrix_title">Urgent & Not Important</div>
                    <div className="not_imp_urgent" >
                            {
                                task_data.filter( item => item.is_urgent && !item.is_important  ).map( (item)=>{
                                    return (
                                        <div key={item.id}>● {item.title}</div>
                                    )
                                } )
                            }
                        </div>
                </div>
                <div className="matrix_div_container">
                <div className="matrix_title">Important & Not Urgent</div>
                    <div className="imp_not_urgent">
                            {
                                task_data.filter( (item)=> item.is_important && !item.is_urgent  ).map( (item)=>{
                                    return(
                                        <div key={item.id}>● {item.title}</div>
                                    )
                                } )
                            }

                    </div>
                </div>
                <div className="matrix_div_container">
                <div className="matrix_title">Low Priority</div>
                    <div className="not_imp_not_urgent">
                            {
                                task_data.filter( (item)=> !item.is_important && !item.is_urgent  ).map( (item)=>{
                                    return(
                                        <div key={item.id}>● {item.title}</div>
                                    )
                                } )
                            }

                    </div>
                </div>

            </div>
        </div>
    )
}