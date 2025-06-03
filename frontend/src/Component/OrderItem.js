import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
export default function OrderItem() {
    const [images,setImages] = useState([]);
    useEffect(() => {
        fetchImages();
    }, []);
    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8081/ordereditem');
            const imageData = response.data.map(image => ({
                id: image.id,
                img1: `data:image/jpeg;base64,${arrayBufferToBase64(image.img1.data)}`,
                img2: `data:image/jpeg;base64,${arrayBufferToBase64(image.img2.data)}`,
                img3: `data:image/jpeg;base64,${arrayBufferToBase64(image.img3.data)}`,
                img4: `data:image/jpeg;base64,${arrayBufferToBase64(image.img4.data)}`,
                img5: `data:image/jpeg;base64,${arrayBufferToBase64(image.img5.data)}`,
                brand:image.brand,
                details:image.details,
                price:image.price,
                discount:image.discount,
                rating:image.rating,
            }));
            setImages(imageData);
            console.log(images)
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };

  return (
    <div>
    <div className='Nav'>
        <span id='logo'>Shoppe</span>
        <div className='subnav'>
          <a><i class='bx bx-cog'></i> </a>
          <a><i class='bx bx-bell'></i></a>
          <a><i class='bx bx-history'></i></a>
      </div>
    </div>
    <div className='heading'>
        <span>Ordered Item</span>
    </div>
    <div className='CartContainer'>
      {images.map((image) => (
                    <div key={image.id} className='CartItems'>
                        <img src={image.img1} alt='Product' id='cartimage'></img>
                        <p id='brand'>{image.brand}</p>
                        <p id='details'>{image.details}</p>
                        <p id='details'>{image.date}</p>
                    </div>
                ))}
    </div>
    </div>
  )
}
