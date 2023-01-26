import React,{useState} from "react";
import './App.css';
import NavBar from './components/NavBar'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 
    //initial data
        const data= [
            {
                id: 1,
                text: 'Doctors Appointment',
                date: 'Feb 5th at 2:30pm',
                location:'Karolinska University Hospital',
                reminder: true
              },
              {
                id: 2,
                text: 'Team weekly Meeting',
                date: 'March 6th at 10:30am',
                location:'zoom',
                reminder: false
              },
              {
                id: 3,
                text: 'Department Meeting',
                date: 'March 16th at 11:00am',
                location:'office',
                reminder: true
              }
        ]
        //show and hide add task section
       const [toggleAdd, setToggleAdd]=useState(false)

        const [tasks, setTasks]=useState(data)

        //delete task
        const handleDelete=(id)=>{
         console.log("delete",id)
         if (window.confirm('You want to delette ?')) {
          setTasks(tasks.filter((task)=>task.id!==id))
         }
         
        }

         //toggle reminder
         const handleToggle=(id)=>{
          console.log("toggle",id)
          setTasks(tasks.map((task)=>
            task.id===id ? 
              {...task, reminder:!task.reminder}:task
            
          ))
         }

        //add task
        const handleAdd=(task)=>{
          console.log("add", task)
          //create random id
          const id= Math.floor(Math.random() * 100000)+1
          //create newTask with id and the value passed from AddTask
          const newTask={id, ...task}
          setTasks([...tasks,newTask])
        }
    //handle show and hide of add task component
        const handleToggleAdd=()=>{
          setToggleAdd(!toggleAdd)
          console.log(toggleAdd)
        }
 
  return (
    <Router>
    <NavBar/>
  
    <Routes>
    <Route path='/'  element={ <div className="main">
      <Header handleToggleAdd={handleToggleAdd} toggleAdd={toggleAdd}/>
      {toggleAdd && <AddTask handleAdd={handleAdd}/>}
      <Tasks tasks={tasks} handleDelete={handleDelete} handleToggle={handleToggle} /></div>}/>
      
    <Route path='/About' element={<About/>}/>
    
    </Routes>
    <Footer/>
    </Router>
  );
}

export default App;
