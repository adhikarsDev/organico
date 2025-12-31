import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Truck, Recycle } from 'lucide-react';
import categories from '../data/categories.json';
import products from '../data/products.json';
import ProductCard from '../components/product/ProductCard';
import './Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-badge">100% Organic & Natural</span>
            <h1>Freshness Delivered From Our <span>Farms</span> to Your <span>Table</span></h1>
            <p>Experience the true taste of nature with our handpicked organic produce. No pesticides, no chemicals, just pure goodness.</p>
            <div className="hero-btns">
              <Link to="/shop" className="btn btn-primary">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn btn-outline">Learn More</Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop" alt="Organic Vegetables" />
            <div className="hero-floating-card">
              <Leaf color="var(--primary)" fill="var(--primary)" />
              <div>
                <h4>Certified Organic</h4>
                <p>Trust in nature's quality</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container py-16">
        <div className="feature-item">
          <div className="feature-icon"><Truck /></div>
          <div>
            <h3>Free Shipping</h3>
            <p>On all orders over ₹500</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon"><ShieldCheck /></div>
          <div>
            <h3>Secure Payment</h3>
            <p>100% protected payments</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon"><Recycle /></div>
          <div>
            <h3>Eco-Friendly</h3>
            <p>Sustainable packaging</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories container py-16">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <Link to="/shop" className="view-all">View All <ArrowRight size={16} /></Link>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/shop?category=${cat.id}`} 
              className={`category-card card-${cat.id}`}
            >
              <div className="category-image">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  loading="lazy" 
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured container py-16">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/shop" className="view-all">View All <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta container">
        <div className="cta-box">
          <div className="cta-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates on new products and special offers.</p>
            <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
