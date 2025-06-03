import React from 'react'
import { useState } from 'react';
import Validation  from './SignupValidation';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

export default function Signup() {
   
  const [values,setvalues] = useState({
    fname:'',
    lname:'' ,
    phonenumber:'',
    email:'',
    password:''
  })

  const [errors,seterror] = useState({});
  
  const navigate = useNavigate();

  const handleInput = (event) =>{
    setvalues(prev =>({...prev,[event.target.name]:[event.target.value]}))
  }
  const handlesubmit  = (event) =>{
    event.preventDefault();
    seterror(Validation(values));
    if(errors.fname === "" && errors.lname === "" && errors.phonenumber === "" && errors.email === "" && errors.password === "")
    {
      axios.post('http://localhost:8081/signup',values,
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body:JSON.stringify(values)
      })
      .then((response)=>
        navigate('/login')
      )
      .catch((err)=>console.log(err))
    }
    }
  
  return (
    <div className='center-container1'>
      <h2 className='Heading'>Signup</h2>
      <form id='form' className='form' autoComplete='on' onSubmit={handlesubmit}>
      <label htmlFor='fname'>First Name</label>
        <input className='input' name='fname'  type='text' onChange={handleInput} placeholder='First Name' id='fname'></input>
        {errors.fname && <span className='ErrorMessage'>{errors.fname}</span>}
        <label htmlFor='lname' >Last Name</label>
        <input className='input'  name='lname'  type='text' onChange={handleInput} placeholder='Last Name' id='lname'></input>
        {errors.lname && <span className='ErrorMessage'>{errors.lname}</span>}
        <label  htmlFor='Age' >Phone number</label>
        <input className='input' name='phonenumber'   type='number' onChange={handleInput} placeholder='Phone number' id='age'></input>
        {errors.phonenumber && <span className='ErrorMessage'>{errors.phonenumber}</span>}
        <label htmlFor='Email' >Email</label>
        <input className='input'   onChange={handleInput} type='text' name='email' placeholder='Email' id='Email'></input>
        {errors.email && <span className='ErrorMessage'>{errors.email}</span>}
        <label htmlFor='Pass' >Password</label>
        <input className='input'  onChange={handleInput} type='password' name='password' placeholder='Password' id='pass'></input>
        {errors.password && <span className='ErrorMessage'>{errors.password}</span>}
        <button type='submit' id='submit'  >Submit</button>
      </form>
      <div style={{'display':'flex'}}>
      <span> Already have an account ??</span><a id='anchor' href='/login'>  Click here</a>
      </div>
    </div>
  )

  }