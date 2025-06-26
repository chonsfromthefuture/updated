import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Page/LandingPage/LandingPage";
import Addtocart from "./Page/Addtocartpage/Addtocart";
import HomePage from "./Page/HomePage/HomePage";  
import Login from "./Page/Login/Login";
import SignupPage from "./Page/SignUp/SignUp";
import SellerPage from "./Page/SellerPage/SellerPage";
import SellerPageItem from "./Page/SellerPage/SellerPageItem";
import ViewCart from "./Page/Viewcart/viewcart";
import Myprofile from './Page/MyProfile/myprofile';
import { useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  useEffect(()=>{
    fetch('')
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Default route */}
        <Route path="/home" element={<HomePage />} /> {/* paths usually lowercase */}
        <Route path="/cart" element={<Addtocart />} />
        <Route path="/myprofile" element={<Myprofile/>} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Fixed spelling from 'SigUp' */}
        <Route path="/seller/home" element={<SellerPage />}/>
        <Route path="/seller/view-items" element={<SellerPageItem/>}/>
      </Routes>
    </Router>
  );
}

export default App;
