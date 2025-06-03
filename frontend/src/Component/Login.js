import React from 'react'
import '../StyleSheet/Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import Hello from './Hello';
export default function Login() {
  const [values,setvalues] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const [errors,seterror] = useState({});
  
  const handleInput = (event) =>{
    setvalues(prev =>({...prev,[event.target.name]:[event.target.value]}))
  }
  const handlesubmit  = (event) =>{
    event.preventDefault();
    seterror(Validation(values));

    if( errors.email === "" && errors.password === "")
    {
      axios.post('http://localhost:8081/login',{
        email:values.email,
        password:values.password
      },
      {
        headers:{
          "Content-Type":"application/json"
        }
        
      })
      .then((response)=>
          {
       
              navigate('/hello');
            
        })
      .catch((err)=>console.log(err))
    }
   
  }
  return (
    <div className='center-container1'>
      <h2 className='Heading'>Login</h2>
      <form id='form' className='form' autoComplete='on' onSubmit={handlesubmit}>
        <label htmlFor='Email' >Email</label>
        <input className='input' name='email'  onChange={handleInput} type='text' placeholder='Email' id='Email'></input>
        {errors.email && <span className='ErrorMessage'>{errors.email}</span>}
        <label htmlFor='Pass' >Password</label>
        <input  className='input' name='password'  onChange={handleInput} type='password' placeholder='Password' id='pass'></input>
        {errors.password && <span className='ErrorMessage'>{errors.password}</span>}
        <button type='submit'  id='submit' >Submit</button>
      </form>
     <div style={{'display':'flex'}}>
     <span> Don't have an account ?? </span><a id='anchor' href='/signup'> Create new account</a>
     </div>
    </div>
  )
}

