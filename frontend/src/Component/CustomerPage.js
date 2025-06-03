import React, { useState } from 'react';
import '../StyleSheet/Customer.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import axios from 'axios';
export default function CustomerPage() {
  const location = useLocation();
  const productdetails = location.state.image;
    const [name, setName] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    
    const navigate = useNavigate();
    const handleInput = (event) => {
        setName(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }



    const handlecash = (event) =>{
      event.preventDefault();
        axios.post('http://localhost:8081/order',productdetails,
          {
            method:'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body:JSON.stringify(productdetails)
          })
          .then((response)=>
          alert('Thank you for your order... You will get the item as soon as possible'),
            navigate('/hello/orderitem')
          )
          .catch((err)=>console.log(err))
    }

    return (
        <div className='customercontainer'>
            <h1>Customer Details</h1>
            <form className='form1'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' onChange={handleInput} placeholder='Enter your name' required />

                <label htmlFor='email'>Email ID</label>
                <input type='text' id='email' name='email' onChange={handleInput} placeholder='Enter your Email id' required/>

                <label htmlFor='phone'>Phone</label>
                <input type='number' id='phone' name='phone' onChange={handleInput} placeholder='Enter your phone number'  required/>

                <label htmlFor='address'>Address</label>
                <input type='text' id='address' name='address' onChange={handleInput} placeholder='Enter your current address' required/>

                <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                    <button type="submit" onClick={handlecash}>Cash on delivery</button>
                    <button type="submit" onClick={() => navigate('/hello/payment', { state: { name } })}s>Online payment</button>
                </div>
            </form>
        </div>
    )
}
