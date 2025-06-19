// Footer for everyone else
import "./Footer.css";
import logo from '../../assets/clouds.jpg'
// Optionally import your logo image
// import logo from "../../assets/Screenshot-2025-05-25-122902.png";

export default function Footer() {
  return (
    <footer>
      <div className="col">
        <img
          className="logo"
          src="" // Replace with correct path or imported `logo`
          alt="Vinques"
          height="80px"
          width="85px"
        />
        <h4>Contact</h4>
        <p>
          <strong>Address: </strong> Antiquan sa antique
        </p>
        <p>
          <strong>Phone: </strong> +63 09123456789
        </p>
        <div className="follow">
          <h4>Follow us</h4>
          <div className="icon">
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-google"></a>
          </div>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <a href="#">About us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact us</a>
      </div>

      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign in</a>
        <a href="#">View Cart</a>
        <a href="#">Track my Order</a>
        <a href="#">Help</a>
      </div>

      <div className="col">
        <h4>Secured Payment Gateway</h4>
        <i className="fa fa-cc-paypal" style={{ fontSize: "36px" }}></i>
      </div>

      <div className="copyright">
        <p>@2025, OLD BUT GOLD Ecommerce</p>
      </div>
    </footer>
  );
}

