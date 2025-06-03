import React, { useState,useEffect } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import '../StyleSheet/ItemPage.css';
import axios from 'axios';
import Headphone from '../Images/headphones.jpg';
import Men from '../Images/Men.jpg';
import Women from '../Images/Women.jpg';        
export default function ItemPage() {
    const location = useLocation();
    const image = location.state.image;
    const [hover,sethover] = useState(image.img1);
    const [ShowImages, setImages] = useState([]);
    const navigate  = useNavigate();
    useEffect(() => {
        fetchImages();
    }, []);

    
    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8081/product');
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

    const getRandomItems = () => {
      const shuffled = ShowImages.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      return selected;
   };
  const randomItems = getRandomItems();
    
  const HandleCart = (image)=>{
    axios.post('http://localhost:8081/cartinsert',image,
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body:JSON.stringify(image)
      })
      .then((response)=>
        navigate('/hello/cart') 
      )
      .catch((err)=>console.log(err))
  }
  

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
            <span>BLOG</span>
          </li>
          <li>
            <span onClick={()=>{window.location.href='/hello/cart'}}>CART</span>
          </li>
        </ul>
        </div>
        <div>
    </div>
    <div className='ItemContainer'>
        <div className='ItemImageContainer'>
            <div >
              <img src={hover} alt='mainimage' className='MainImage'></img>
            </div>
            <div className='ItemSubImageContainer'>
                <img src={image.img2} alt='img' onClick={()=>{sethover(image.img2)}}></img>
                <img src={image.img3} alt='img' onClick={()=>{sethover(image.img3)}}></img>
                <img src={image.img4} alt='img' onClick={()=>{sethover(image.img4)}}></img>
                <img src={image.img5} alt='img' onClick={()=>{sethover(image.img5)}}></img>
            </div>
        </div>
        <div className='ItemDetailsContainer'>
            <h1 id='brand'>{image.brand}</h1>
            <p id='details'>{image.details}</p>
            <div className='price'>
                <p id='price'>{image.price}  &#8377;</p>
                <p id='discount'><del>{image.discount} &#8377;</del></p>
            </div>
            <div style={{'display':'flex','justifyContent':'space-between'}}>
                <div style={{'display':'flex'}} className='stardiv'>
                  <i  className='bx bxs-star' id='star'></i>
                  <i  className='bx bxs-star' id='star'></i>
                  <i  className='bx bxs-star' id='star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                </div>
              </div>
            <div className='button'> 
              <button onClick={()=>{ HandleCart(image)}} className='cartbutton'>Cart</button>
              <button className='cartbutton' onClick={() => navigate('/hello/customer', { state: { image } })}>buy</button>
            </div>
        </div>
    </div>

    <h3 id='header'>Recommanded item's</h3>
    <div className='itemContainer'>
                {randomItems.map((image) => (
                    <div key={image.id} onClick={() => navigate('/hello/item', { state: { image } })}>
                        <div className="items">
                            <div className='imageitems'>
                                <img src={image.img2} alt='shirt'></img>
                            </div>
                            <p id='ItemName'>Brand:{image.brand}</p>
                            <p id='ItemDetails'>{image.details}</p>
                            <div className='PriceDiscount'>
                                <span>Price : {image.price} &#8377; <del>{image.discount} &#8377;</del></span>
                                <a><i id='Heart' class='bx bxs-heart-circle'></i></a>
                                <a onClick={()=>{window.location.href='/hello/cart'}}><i id='cart' class='bx bxs-cart'></i></a>
                                </div>
                           
                        </div>
                    </div>
                ))}
            </div>

    <div className='footer'>
    <div className='FooterContainer1'>
    <ul>
      <span>Shop</span>
      <li>Drinks</li>
      <li>DrinkesGift Cards</li>
      <li>Store Locator</li>
      <li>Refere Freind</li>
    </ul>
    <ul>
      <span>Help</span>
      <li>Contact Us</li>
      <li>FAQ</li>
      <li>Accessibility</li>
    </ul>
    <ul>
      <span>About</span>
      <li>Our story</li>
      <li>OLIPOP Digest</li>
      <li>Store Ingredients</li>
      <li>Press</li>
      <li>Carrier</li>
    </ul>
    </div>
    <div className='FooterContainer2'>
      <p>Sign up to get 10% off your first order</p>
      <div className='subscribe'>
        <input type='text' placeholder='Your Email address'></input>
        <button>Subscribe</button>
      </div>
    </div>
  </div>

    <div className='AllNavTag'>
        <a><i class='bx bx-home-alt-2'></i></a>
        <a><i class='bx bx-category'></i></a>
        <a><i class='bx bx-heart'></i></a>
        <a><i class='bx bx-cart'></i></a>
      </div>
    </div>
    );
}
