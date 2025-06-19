import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [businessPermit, setBusinessPermit] = useState('');
  const [password, setPassword] = useState('');
  const [recheckPassword, setRecheckPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRecheckPassword, setShowRecheckPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();

    if (!name || !email || !password || !recheckPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    if (password !== recheckPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (role === 'seller' && !businessPermit.trim()) {
      alert('Please enter your business permit.');
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: role === 'customer' ? 'Customer' : 'Seller',
      business_permit: role === 'seller' ? businessPermit.trim() : null,
    };

    try {
      const response = await fetch('http://localhost:4280/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }

      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      alert('Signup failed. ' + error.message);
      console.error(error);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'recheckPassword') {
      setShowRecheckPassword(!showRecheckPassword);
    }
  };

  return (
    <main className={styles['signup-page']}>
      <form className={styles['signup-form']} onSubmit={handleSignup}>
        <h1 className={styles['signup-title']}>Create an Account</h1>

        <div className={styles['form-group']}>
          <label htmlFor="name" className={styles['form-label']}>Name</label>
          <input type="text" id="name" name="name" className={styles['form-input']} required />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="email" className={styles['form-label']}>Email</label>
          <input type="email" id="email" name="email" className={styles['form-input']} required />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="password" className={styles['form-label']}>Password</label>
          <div className={styles['password-input-group']}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={styles['form-input']}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              className={styles['toggle-password-btn']}
              onClick={() => togglePasswordVisibility('password')}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🔓' : '🔒'}
            </button>
          </div>
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="recheckPassword" className={styles['form-label']}>Re-enter Password</label>
          <div className={styles['password-input-group']}>
            <input
              type={showRecheckPassword ? 'text' : 'password'}
              id="recheckPassword"
              className={styles['form-input']}
              value={recheckPassword}
              onChange={(e) => setRecheckPassword(e.target.value)}
              required
              minLength={8}
            />
            <button
              type="button"
              className={styles['toggle-password-btn']}
              onClick={() => togglePasswordVisibility('recheckPassword')}
              aria-label={showRecheckPassword ? 'Hide re-entered password' : 'Show re-entered password'}
            >
              {showRecheckPassword ? '🔓' : '🔒'}
            </button>
          </div>
        </div>

        <fieldset className={styles['form-group']}>
          <legend className={styles['form-label']}>I am a:</legend>
          <div className={styles['radio-group']}>
            <label className={styles['radio-label']}>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={role === 'customer'}
                onChange={() => setRole('customer')}
                className={styles['radio-input']}
              />
              Customer
            </label>
            <label className={styles['radio-label']}>
              <input
                type="radio"
                name="role"
                value="seller"
                checked={role === 'seller'}
                onChange={() => setRole('seller')}
                className={styles['radio-input']}
              />
              Seller
            </label>
          </div>
        </fieldset>

        {role === 'seller' && (
          <div className={styles['form-group']}>
            <label htmlFor="businessPermit" className={styles['form-label']}>Business Permit</label>
            <input
              type="text"
              id="businessPermit"
              className={styles['form-input']}
              value={businessPermit}
              onChange={(e) => setBusinessPermit(e.target.value)}
              required
              placeholder="Enter your business permit number"
            />
          </div>
        )}

        <button type="submit" className={styles['submit-btn']}>
          Sign Up
        </button>
      </form>
    </main>
  );
}
