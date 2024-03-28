import './App.css';
import {useEffect, useRef, useState} from 'react';

function App() {
  const titleVal=useRef();
  const priceVal=useRef();
  const detailsVal=useRef();
  const [data,setData]=useState([]);
  const fetchHandler=async ()=>{
     const fetchData=await fetch('http://localhost:4000/get')
     const a=await fetchData.json();
     setData(a);
  }
  useEffect(()=>{
     fetchHandler();
  },[]);
  
  const submitHandler=async (e)=>{
    e.preventDefault();
    const userDetails={
      title:titleVal.current.value,
      price: priceVal.current.value,
      details: detailsVal.current.value,
     }
     setData(prev=>[...prev,userDetails]);
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
      alert("sucessful");
     } catch (error){
      console.log(error);
     }
  }
  const deleteHandler=async (id)=>{
    console.log('id',id);
     try{
       const res=await fetch(`http://localhost:4000/delete/${id}`,{
         method: 'DELETE',
       });
       if(!res.ok){
        throw new Error('Failed to delete data');
       }
       const resData=await res.json();
       console.log('res',resData);
       alert("sucessfully deleted");
     }catch (error){
       console.log(error);
     }
  }
   
  return (
    <>
    <div className="App">
       <h1>Full stack Expense_App</h1>
      Expense_Title: <input type='text' ref={titleVal}/><br/>
      Price: <input type='text' ref={priceVal}/><br/>
      Some Details: <input type='text' ref={detailsVal}/><br/><br/>
      <button onClick={submitHandler}>Submit</button>
    </div><br/>
   <div className='div'>{
        data.map((e,index)=>{
          return <div key={index}>
            <h2>{e.title}</h2>
            <h2>{e.price}</h2>
            <h2>{e.details}</h2>
            <button className='btn'onClick={()=>deleteHandler(index)}>Delete</button>
          </div>
        })
      }
      </div>
    </>
  );
}

export default App;
