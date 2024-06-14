import React, {useState} from 'react';
import axios from 'axios';
//to pass the database we use axios
const Create = ({onAddTask}) => {
    //whatever we write in tast it will store in task
    const [task, setTask]=useState("");
    const handleAdd=()=>{
         axios.post('http://localhost:3001/add', {task:task})
         .then(result=> {
          onAddTask(result.data);
          setTask("");  // Clear the input field after adding the task
         })
         .catch(err => console.log(err))
    }
  return (
    <div className='create_form'>
      <input type ="text" placeholder='enter Task' value={task} onChange={(e)=> setTask(e.target.value)}/>
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Create;