import './App.css';
import {useRef} from 'react';

function App() {
  const nameVal=useRef();
  const ageVal=useRef();
  const rollVal=useRef();
  const numberVal=useRef();
  
  const submitHandler=async (e)=>{
    e.preventDefault();
    const userDetails={
      name:nameVal.current.value,
      age: ageVal.current.value,
      roll: rollVal.current.value,
      number:numberVal.current.value
    }
     try{
      const response=await fetch('http://localhost:4000/post',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      })
      if(!response.ok){
        throw new Error('Failed to post data');
      }
      const responseData=await response.json();
      console.log('response',responseData);
     } catch (error){
      console.log(error);
     }
  }
   
  return (
    <div className="App">
       <h1>Full stack App</h1>
      Name: <input type='text' ref={nameVal}/><br/>
      Age: <input type='text' ref={ageVal}/><br/>
      Roll: <input type='number' ref={rollVal}/><br/>
      Mark: <input type='number' ref={numberVal}/> <hr/>
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default App;
