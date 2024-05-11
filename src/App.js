import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Shop } from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import { LoginSignUp } from './Pages/LoginSignUp';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import OrderPage from './Pages/OrderPage';
import Succes from './Pages/Succes';
import Failed from './Pages/Failed';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Office from './Pages/Office';
import News from './Pages/News';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<ShopCategory banner={men_banner} category="men"/>} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>} />
          <Route path='/kid' element={<ShopCategory banner={kid_banner} category="kid"/>} />
          <Route path='/product' element={<Product/>}>
            <Route path=':productid' element={<Product/>}/>
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignUp />} />
          <Route path='/myorders' element={<OrderPage/>}/>
          <Route path='/Successful' element={<Succes/>}/>
          <Route path='/Failed' element={<Failed/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/offices' element={<Office/>}/>
          <Route path='/News' element={<News/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
