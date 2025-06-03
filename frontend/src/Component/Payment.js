import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Payment() {
    const location = useLocation();
    const image = location.state.name;
    const sendMessage = () => {
        axios.post('http://localhost:8081/send-message', {
            phoneNumber: image.phone, 
            message: 'Your order placed'
        })
        .then(response => {
            console.log('Message sent successfully:', response.data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    }

    return (
        <div className='customercontainer'>
            <img src='' alt='Imag'></img>
            <button onClick={sendMessage}>Mark as done</button>
        </div>
    )
}
