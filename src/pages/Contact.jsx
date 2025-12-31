import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Simulate API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Sending message...',
        success: 'Message sent successfully!',
        error: 'Failed to send message.',
      }
    );
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  return (
    <div className="contact-page container py-16">
      <div className="contact-header text-center mb-16">
        <h1>Get in Touch</h1>
        <p>Have questions about our products or your order? We're here to help!</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-cards">
          <div className="info-card">
            <div className="info-icon"><Mail /></div>
            <div>
              <h3>Email Us</h3>
              <p>hello@organico.com</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon"><Phone /></div>
            <div>
              <h3>Call Us</h3>
              <p>+1 (555) 000-1111</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon"><MapPin /></div>
            <div>
              <h3>Visit Us</h3>
              <p>123 Farm Road, Green Valley</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                className={errors.name ? 'error' : ''}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Your Name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                className={errors.email ? 'error' : ''}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="How can we help?"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea 
                rows="5"
                className={errors.message ? 'error' : ''}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Type your message here..."
              ></textarea>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
