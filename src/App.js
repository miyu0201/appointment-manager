import React,{useState,useEffect} from "react";
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
 
        //show and hide add task section
       const [toggleAdd, setToggleAdd]=useState(false)

        const [tasks, setTasks]=useState([])
       
         //fetch all data from server
         const fetchTasks = async()=>{
          const res = await fetch("http://localhost:5000/tasks")
          const data =await res.json()
          return data
        }

       //fetch a single data from server
        const fetchTask = async(id)=>{
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
          const data =await res.json()
          return data
        }
        //call fetchTasks in useEffect, and setTasks
        useEffect(()=>{
         const getData=async()=>{
           const data = await fetchTasks()
           setTasks(data)
         }

         getData()
         console.log(tasks)
        }, [])

       
        //delete task
        const handleDelete = async(id)=>{
         console.log("delete",id)
         await fetch(`http://localhost:5000/tasks/${id}`,{
          method:'DELETE',
         })

         if (window.confirm('Do you want to delete ?')) {
          setTasks(tasks.filter((task)=>task.id!==id))
         }
         
        }

         //toggle reminder
         const handleToggle=async(id)=>{
          const taskToToggle = await fetchTask(id)
          const updtask = {...taskToToggle,
          reminder:!taskToToggle.reminder}

          //make update request
          const res = await fetch(`http://localhost:5000/tasks/${id}`,{
            method:"PUT",
            headers:{
              'Content-type':'application/json'
            },
            body:JSON.stringify(updtask)
          })
          //console.log("toggle",id)
          const data= await res.json()

          setTasks(tasks.map((task)=>
            task.id===id ? 
              {...task, reminder:data.reminder}:task
            
          ))
         
         }

        //add task
        const handleAdd= async(task)=>{
         const res = await fetch("http://localhost:5000/tasks",{
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify(task)
         })

         const data= await res.json()
         // console.log("add", task)
        
          setTasks([...tasks,data])
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

/* without server
function App() {
 
    //initial data with out server
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
        
        const [tasks, setTasks]=useState()
        
        
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
*/