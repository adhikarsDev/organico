import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty container py-16">
        <div className="empty-content text-center">
          <ShoppingBag size={80} className="empty-icon" />
          <h1>Your cart is empty</h1>
          <p>It looks like you haven't added any organic goodness to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary mt-4">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container py-16">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <Link to={`/product/${item.id}`} className="item-name">{item.name}</Link>
                <div className="item-meta">
                  <span>Category: {item.category}</span>
                  <span>Price: ₹{item.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <div className="item-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
              <button className="item-remove" onClick={() => removeFromCart(item.id)}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          
          <Link to="/shop" className="continue-shopping">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
          
          <div className="payment-methods">
            <p>Secure Payments via</p>
            <div className="payment-icons">
              {/* Add payment icons here if needed */}
              <span>Visa</span> <span>MC</span> <span>PayPal</span> <span>ApplePay</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
