import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Headphone from '../Images/headphones.jpg';
import Men from '../Images/Men.jpg';
import Women from '../Images/Women.jpg';
import '../StyleSheet/Cart.css';

export default function Cart() {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const [total,settotal] = useState(0);
    useEffect(() => {
        fetchImages();
    }, []);

    const HandleDelete = (id) =>{
    
        axios.post('http://localhost:8081/cartdelete', { id })
            .then(response => {
                console.log('Data deleted successfully:', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    };
    

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8081/cart');
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
                rating:image.rating
            }));
            setImages(imageData);
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

    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, 2000); 
        return () => clearTimeout(timeout);
      }, []); 
    
    return (
        <div>
        <div >
    {isVisible && (
      <div className='Message'>
        <h1>Buy your favourite product ?</h1>
      </div>
    )}
  </div>
        <div className='Nav'>
        <span id='logo'>Shoppe</span>
        <div className='subnav'>
          <a><i class='bx bx-cog'></i> </a>
          <a><i class='bx bx-bell'></i></a>
          <a><i class='bx bx-history'></i></a>
      </div>
      </div>
      
    
      <div className='AllList'>
        <ul className='List'>
          <li>
            <span onClick={()=>{window.location.href='/hello'}}>HOME</span>
          </li>
           <li>
            <span>CATEGORIE'S</span>
            <div className='tooltip1 '>
              <div class='tootlip container'>
                  <span>Electronics</span>
                  <ul>
                    <li>Desktop</li>
                    <li>Laptop</li>
                    <li>Camera</li>
                    <li>Tablet</li>
                    <li>HeadPhone</li>
                  </ul>
                  <img className='OfferItem'  src={Headphone} alt='Headphone'></img>
              </div>

              <div class='tootlip container'>
                  <span>Men's Brand</span>
                  <ul>
                    <li>Formal</li>
                    <li>Casual</li>
                    <li>Sports</li>
                    <li>Jacket</li>
                    <li>Sunglasses</li>
                  </ul>
                  <img className='OfferItem'  src={Men} alt='Headphone'></img>
              </div>

              <div class='tootlip container'>
                  <span>Women's</span>
                  <ul>
                    <li>Formal</li>
                    <li>Casual</li>
                    <li>Perfume</li>
                    <li>Cosmetics</li>
                    <li>Bag's</li>
                  </ul>
                  <img className='OfferItem'  src={Women} alt='Headphone'></img>
              </div>
            </div>
          </li>
          <li>
            <span>MEN'S</span>
            <div className='tooltip'>
              <ul>
                <li>Shirt</li>
                <li>Shorts & Jeans</li>
                <li>Safety Shoes</li>
                <li>Wallet</li>
              </ul>
            </div>
          </li>
          <li>
            <span>WOMEN'S</span>
            <div className='tooltip'>
              <ul>
                <li>Dress & Frock</li>
                <li>Earing's</li>
                <li>Necklace</li>
                <li>Makeup Kit</li>
              </ul>
            </div>
          </li>
          <li>
            <span>JEWELERY</span>
            <div className='tooltip'>
              <ul>
                <li>Earring's</li>
                <li>Couple Ring's</li>
                <li>Necklace</li>
                <li>Bracelet's</li>
              </ul>
            </div>
          </li>
          <li>
            <span>PERFUME</span>
            <div className='tooltip'>
              <ul>
                <li>Clothes Perfume</li>
                <li>Deodorant</li>
                <li>Flower Fragrance</li>
                <li>Air Freshner</li>
              </ul>
            </div>
          </li>
          <li>
            <span onClick={()=>{window.location.href='/hello/orderitem'}}>ORDERED ITEM</span>
          </li>
          <li>
            <span onClick={()=>{window.location.href='/hello/cart'}}>CART</span>
          </li>
        </ul>
        </div>
        <div>
    </div>
            <div className='CartContainer'>
                {images.map((image) => (
                    <div key={image.id} className='CartItems'>
                        <img src={image.img1} alt='Product' id='cartimage'></img>
                        <p id='brand'>{image.brand}</p>
                      <div style={{'display':'flex','justifyContent':'space-evenly'}} className='pricecontainer'>
                        <p>{image.price}  &#8377;</p>
                        <p style={{'color':'green'}}><del>{image.discount}  &#8377;</del></p>
                      </div>
                        <div className='cartbuttons'>
                            <button id='remove' onClick={() => navigate('/hello/customer', { state: { image } })}>Buy</button>
                            <button id='remove' onClick={()=>{HandleDelete(image.id)}}>Remove from Cart</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

    }