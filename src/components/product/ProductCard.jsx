import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy" 
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=800&auto=format&fit=crop';
            }}
          />
          <div className="product-overlay">
            <button 
              className="quick-add" 
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              <Plus size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </Link>
      
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <Star size={14} fill="var(--accent)" color="var(--accent)" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        
        <div className="product-footer">
          <div className="product-price-wrapper">
            <span className="product-price">₹{product.price.toFixed(2)}</span>
            <span className="product-unit">/{product.unit}</span>
          </div>
          <button 
            className="add-to-cart-btn" 
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
