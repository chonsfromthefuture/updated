import "./AddToCart.css";
import Header from "../../Compo/Header/Header";
import Footer from "../../Compo/Footer/Footer";
import ProductDetails from "../../Compo/productdetails"; // Make sure path is correct!
import { useNavigate } from "react-router-dom";

export default function AddToCart() {
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <main className="addToCartPage">
        <ProductDetails
          title="ate kapatid niyo po ba yung sikat sa memes"
          price={1500}
          imageUrl="/assets/clouds.jpg"  // ✅ Update to your actual image path
          description="A beautiful vintage clock from the 1950s, perfect for collectorsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss."
          onBuy={handleBuy}
        />
      </main>
      <Footer />
    </>
  );
}
