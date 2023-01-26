import React from 'react'

const Task = ({task,handleDelete,handleToggle}) => {
  return (
    //change classname according to reminder true or false
    //keep task in className

    <div className={`task ${task.reminder && 'reminder'}`} >
        <h4 key={task.id}>{task.text}
        <i class="fas fa-times" style={{color:"red", cursor:"pointer", float:"right"}} onClick={()=>handleDelete(task.id)}></i>
        </h4> 
        <p>{task.date}</p>
        <p>Location: {task.location}</p>
        <p>Reminder: <i class="fa-solid fa-bell" onClick={()=>handleToggle(task.id)} style={{color:task.reminder===true? 'green':'grey', cursor:"pointer"}}></i></p>
       
    </div>
  )
}

export default Task
