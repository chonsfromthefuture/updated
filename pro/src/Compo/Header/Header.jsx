// frontend/src/Compo/Header/Header.jsx

import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';

// Accept 'showSearchBar' as a prop, with a default of true
const Header = ({ showSearchBar = true }) => { // Set default to true
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Optional
    navigate('/');
  };


  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Vinque
      </div>

      {/* Conditionally render the search bar */}
      {showSearchBar && ( // This checks if showSearchBar is true
        <div className={styles.searchContainer}>
          <input type="text" className={styles.search} placeholder="Search here:" />
          <button className={styles.searchBtn}>🔍</button>
        </div>
      )}

      <div className={styles.profileWrapper}>
        <div className={styles.profile}>👤</div>
        <div className={styles.dropdown}>
          <ul>
            <li onClick={() => handleNavigation('/myprofile')}>Profile</li>
            <li onClick={() => handleNavigation('/viewcart')}>View Cart</li>
            <li onClick={handleLogout}>Logout</li>
            <li onClick={() => handleNavigation('/Items')}>Items</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;