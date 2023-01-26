import React , {useState}from 'react'
import Task from './Task'


const Tasks = ({tasks,handleDelete,handleToggle}) => {
  return (
    //mapp through tasks
    <div>
      {tasks.map((task)=>(
        <Task task={task} handleDelete={handleDelete} handleToggle={handleToggle}/>
      
      ))}
    </div>
  )
}

export default Tasks
