import { Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './Component/HomePage';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Hello from './Component/Hello';
import ItemPage from './Component/ItemPage';
import Cart from './Component/Cart'
import CustomerPage from './Component/CustomerPage';
import Payment from './Component/Payment';
import OrderItem from './Component/OrderItem';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/hello' element = {<Hello></Hello>}></Route>
        <Route path='/' element = {<HomePage></HomePage>}></Route>
        <Route path='/login' element = {<Login></Login>}></Route>
        <Route path='/signup' element = {<Signup></Signup>}></Route>
        <Route path='/hello/item' element={<ItemPage></ItemPage>}></Route>
        <Route path='/hello/cart' element={<Cart></Cart>}></Route>
        <Route path='/hello/customer' element={<CustomerPage></CustomerPage>}></Route>
        <Route path='/hello/payment' element={<Payment></Payment>}></Route>
        <Route path='/hello/orderitem' element={<OrderItem></OrderItem>}></Route>
      </Routes>
    </div>
  );
}

export default App;
