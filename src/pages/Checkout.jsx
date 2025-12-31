import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expDate: '', cvv: ''
  });

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container py-16 text-center">
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/shop')}>Go Shopping</button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const placeOrder = (e) => {
    e.preventDefault();
    // Simulate order placement
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing your order...',
        success: 'Order placed successfully!',
        error: 'Failed to place order.',
      }
    ).then(() => {
      clearCart();
      setStep(3);
    });
  };

  if (step === 3) {
    return (
      <div className="checkout-success container py-16 text-center">
        <div className="success-icon"><CheckCircle2 size={80} /></div>
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully and will be delivered soon.</p>
        <p className="order-number">Order ID: #ORG-{Math.floor(Math.random() * 1000000)}</p>
        <button className="btn btn-primary mt-8" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="checkout-page container py-16">
      <div className="checkout-steps mb-12">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Shipping Info</div>
        <ChevronRight size={18} />
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment & Review</div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-side">
          {step === 1 ? (
            <form onSubmit={nextStep}>
              <h3>Shipping Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input name="firstName" required value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input name="lastName" required value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input name="address" required value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input name="city" required value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>ZIP / Postal Code</label>
                  <input name="zip" required value={formData.zip} onChange={handleInputChange} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-8 w-full">Continue to Payment</button>
            </form>
          ) : (
            <form onSubmit={placeOrder}>
              <h3>Payment Details</h3>
              <div className="form-group">
                <label>Card Number</label>
                <input name="cardNumber" placeholder="0000 0000 0000 0000" required value={formData.cardNumber} onChange={handleInputChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiration Date</label>
                  <input name="expDate" placeholder="MM/YY" required value={formData.expDate} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input name="cvv" placeholder="000" required value={formData.cvv} onChange={handleInputChange} />
                </div>
              </div>
              <div className="payment-security">
                <Lock size={14} /> Transactions are encrypted and secure.
              </div>
              <button type="submit" className="btn btn-primary mt-8 w-full">Place Order - ₹{cartTotal.toFixed(2)}</button>
              <button type="button" className="btn btn-outline mt-4 w-full" onClick={() => setStep(1)}>Back to Shipping</button>
            </form>
          )}
        </div>

        <aside className="order-summary-side">
          <div className="summary-box">
            <h3>Order Summary</h3>
            <div className="items-mini-list">
              {cart.map(item => (
                <div key={item.id} className="mini-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-footer mt-6">
              <div className="row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="total mt-4">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
