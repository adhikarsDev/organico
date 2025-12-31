import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Search, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <Leaf className="logo-icon" />
          <span>OrganiCo</span>
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search organic foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <Search size={20} />
          </button>
        </form>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          <Link to="/cart" className="cart-link">
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <form className="mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit"><Search size={20} /></button>
          </form>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>My Cart</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
