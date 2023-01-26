import React,{useState} from 'react'


const AddTask = ({handleAdd}) => {
    const [text,setText]=useState('')
    const [date,setDate]=useState('')
    const [location,setLocation]=useState('')
    const [reminder,setReminder]=useState(false)

    const handleSubmit=(e)=>{
       e.preventDefault()
       if(text==''||date==''){
       alert("Please enter text and data")
       return
       }
       
       //call handleAdd that passed from app as prop
       handleAdd({text,date,location,reminder})

       
      //clear form
       setText('')
       setDate('')
       setLocation('')
       setReminder(false)
      
    }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <div className='form-control'>
        <label>Subject</label>
        <input
          type='text'
          placeholder='Enter subject of the appointment'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Date</label>
        <input
          type='text'
          placeholder='Enter date & time'
          value={date}
         onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Location</label>
        <input
          type='text'
          placeholder='Enter location'
          value={location}
         onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          //checked={reminder}
          value={reminder}
         onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <button type='submit' className='btn btn-block'> Confirm</button> 
    </form>
  )
}

export default AddTask
