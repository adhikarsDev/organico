import React from 'react';
import { Leaf, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <Leaf className="logo-icon" />
            <span>OrganiCo</span>
          </div>
          <p className="footer-tagline">
            Bringing the freshest, most nutritious organic products directly from our farms to your doorstep.
          </p>
          <div className="footer-socials">
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Facebook size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop All</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>
          <ul>
            <li><a href="/shop?category=fruits">Fresh Fruits</a></li>
            <li><a href="/shop?category=vegetables">Vegetables</a></li>
            <li><a href="/shop?category=dairy">Dairy & Eggs</a></li>
            <li><a href="/shop?category=pantry">Pantry</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li><MapPin size={18} /> 123 Farm Road, Green Valley</li>
            <li><Phone size={18} /> +1 (555) 000-1111</li>
            <li><Mail size={18} /> hello@organico.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} OrganiCo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
