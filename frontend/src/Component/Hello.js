import React, { useSyncExternalStore } from 'react';
import { useRef ,useEffect,useState} from 'react';
import axios from 'axios';
import ItemPage from './ItemPage';
import { useNavigate } from 'react-router-dom';
import '../StyleSheet/Hello.css'
import Headphone from '../Images/headphones.jpg';
import Men from '../Images/Men.jpg';
import Women from '../Images/Women.jpg';
import img1 from '../Images/galaxyanimated.jpg';
import img2 from '../Images/gold.jpg';
import img4 from '../Images/shoe.jpg';
import img5 from '../Images/laptop.jpg';
import img6 from '../Images/tv.avif';
import ShirtImage from '../Images/ShirtContainerimage.webp';
import Shoesimage from '../Images/shoesContainer.webp'
import skirtimage from '../Images/skirtContainer.webp'
import mobileimage from '../Images/mobileContainer.jpg'

// Recomandation images
import dumbel11 from '../Images/dumbel11.webp';
import watch11 from '../Images/watch11.jpg';
import { useLocation } from 'react-router-dom';
export default function Hello() {
  const [alluser,setalluser] = useState([])
  const [usename,setusername] = useState("");
  // s
  const containerRef = useRef(null);
  const [handlesearch,sethandlesearch] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 3; 
      }
       if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth - containerRef.current.offsetWidth) {
          containerRef.current.scrollLeft = 0;
        }
    }, 50); 

    return () => {
      clearInterval(scrollInterval);
    };
  },[]); 

  const [searchpage,setsearchpage] = useState(false);
  const [nothing,setnothing] = useState(false);
  const [searchdata,setsearchdata] = useState([]);
  // Handle Search
  const HandleSearch = () =>{
    setsearchpage(true);
    axios.post('http://localhost:8081/search',{
      productname:handlesearch
    },
    {
      headers:{
        "Content-Type":"application/json"
      }
      
    })
    .then((response)=>
        {
          if(response.data)
          {
            const searchdata = response.data.map(image => ({
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
          setsearchdata(searchdata)
          }
          else
            setnothing(true)
          
      })
    .catch((err)=>console.log(err))

  }

  // Hover Image
  // const [Hoverimage1,SetHoverImage1] = useState(ShirtImage11);
  const [ShowImages, setImages] = useState([]);

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

        try {
          const response = await axios.get('http://localhost:8081/username');
          const imageData = response.data.map(image => ({
              id: image.id,
              fname:image.fname,
              lname:image.lname,
              phonenumber:image.phonenumber,
              email:image.email,
              password:image.password,
          }));
          setalluser(imageData);
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
      const selected = shuffled.slice(0, 10);
      return selected;
   };
  const randomItems = getRandomItems();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000); 
    return () => clearTimeout(timeout);
  }, []); 

  console.log(alluser)
  return (
    <div className='title'>
      <div className='Nav'>
        <span id='logo'>Shoppe</span>
        <div className='search1'>
        <input type='text' value={handlesearch} onChange={(e)=>{sethandlesearch(e.target.value)}}  className='searchicon1' placeholder='Enter your product name...'></input>
        <i id='search-icon1' onClick={HandleSearch} class='bx bx-search'></i>
      </div>
        <div className='subnav'>
          <a><i className='bx bx-cog'></i> </a>
          <a><i className='bx bx-bell'></i></a>
          <a><i style={{'marginRight':'20px'}} className='bx bx-log-out' onClick={()=>{navigate('/login')}}></i></a>
          <div className='itemContainer'>
              
          </div>
      </div>
      </div>
      <div className='search'>
        <input type='text' value={handlesearch} onChange={(e)=>{sethandlesearch(e.target.value)}} className='searchicon' placeholder='Enter your product name...'></input>
        <i id='search-icon' onClick={HandleSearch} class='bx bx-search'></i>
    </div>
    
      <div className='AllList'>
        <ul className='List'>
          <li>
            <span>HOME</span>
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
        <div className='ImageContainer' >
            <div className='Container' ref={containerRef}>
              <img src={img1} alt='men' ref={containerRef}></img>
              <img src={img2} alt='men' ref={containerRef}></img>
              <img src={img4} alt='men' ref={containerRef}></img>
              <img src={img5} alt='men' ref={containerRef}></img>
              <img src={img6} alt='men' ref={containerRef}></img>
            </div>
        </div>
      </div>

      <h3 id='header'>Most ordered Items</h3>
      <div className='DemoCategories'>
        <div className='DemoCategoriesContainer'>
          <img src={ShirtImage} alt='ShirtImage'></img>
        </div>
        <div className='DemoCategoriesContainer'>
        <img src={skirtimage} alt='SkirtImage'></img>
      </div>
        <div className='DemoCategoriesContainer'>
          <img src={Shoesimage} alt='ShoesImage'></img>
        </div>
          <div className='DemoCategoriesContainer'>
            <img src={mobileimage} alt='MobileImage'></img>
          </div>
          <div className='DemoCategoriesContainer'>
          <img src={watch11} alt='ShoesImage'></img>
        </div>
          <div className='DemoCategoriesContainer'>
            <img src={dumbel11} alt='MobileImage'></img>
          </div>
      </div>
      <div>
      { searchpage && (
        <div className='searchoption'>
          <button className='button' onClick={()=>{setsearchpage(false)}}><i className='bx bx-x'></i></button>
          <div className='searchitems'>
          {searchdata.map((image) => (
            <div key={image.id}  onClick={() => navigate('/hello/item', { state: { image } })}>
            <div className="items" id='searchitem'>
                <div className='imageitems'>
                    <img src={image.img2} alt='shirt'></img>
                </div>
                <p id='ItemName'>Brand:{image.brand}</p>
                <p id='ItemDetails'>{image.details}</p>
                <div className='PriceDiscount'>
                    <span>{image.price} &#8377; <del>{image.discount}  &#8377;</del></span>
                    <a><i id='Heart' class='bx bxs-heart-circle'></i></a>
                    <a><i id='cart' class='bx bxs-cart'></i></a>
                </div>
            </div>
        </div>
        ))}
        </div>
        {
          nothing && (
            <div>
              <p style={{'color':'white'}}>Item not found</p>
            </div>
          )
        }
        </div>
      )}
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
                                <span>{image.price} &#8377; <del>{image.discount}  &#8377;</del></span>
                                <a><i id='Heart' class='bx bxs-heart-circle'></i></a>
                                <a><i id='cart' class='bx bxs-cart'></i></a>
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
          <li>Gift Cards</li>
          <li>Locate a Store</li>
          <li>Refer a Freind</li>
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
          <li>Readers Digest</li>
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
    </div>
  )
}
