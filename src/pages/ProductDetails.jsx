import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Minus, ShieldCheck, Truck, RefreshCcw, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';
import ProductCard from '../components/product/ProductCard';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary mt-4">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-details-page container py-16">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={18} /> Back to Shop
      </Link>

      <div className="product-main">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="product-info-detailed">
          <span className="product-category-badge">{product.category}</span>
          <h1 className="product-title-large">{product.name}</h1>
          
          <div className="product-rating-review">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.floor(product.rating) ? "var(--accent)" : "none"} 
                  color="var(--accent)" 
                />
              ))}
            </div>
            <span className="rating-value">{product.rating}</span>
            <span className="review-count">(128 Customer Reviews)</span>
          </div>

          <div className="product-price-large">
            ₹{product.price.toFixed(2)}
            <span className="price-unit">/{product.unit}</span>
          </div>

          <p className="product-description-short">
            {product.description}
          </p>

          <div className="product-actions-detailed">
            <div className="quantity-selector-large">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={20} /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}><Plus size={20} /></button>
            </div>
            <button 
              className="btn btn-primary add-to-cart-large"
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingCart size={22} /> Add to Cart
            </button>
          </div>

          <div className="product-features-mini">
            <div className="mini-feature">
              <Truck size={20} />
              <span>Free delivery on orders over ₹500</span>
            </div>
            <div className="mini-feature">
              <ShieldCheck size={20} />
              <span>100% Certified Organic</span>
            </div>
            <div className="mini-feature">
              <RefreshCcw size={20} />
              <span>Easy 30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={activeTab === 'description' ? 'active' : ''} 
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={activeTab === 'nutrition' ? 'active' : ''} 
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition Info
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''} 
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="tab-pane">
              <p>Our {product.name} is sourced directly from certified organic farms that practice sustainable agriculture. We ensure that every {product.unit} meets our high standards for freshness and quality.</p>
              <p>Organic farming means no synthetic pesticides, herbicides, or fertilizers. This results in produce that is not only healthier for you but also better for the environment and the soil.</p>
            </div>
          )}
          {activeTab === 'nutrition' && (
            <div className="tab-pane">
              <ul>
                <li><strong>Calories:</strong> 52 kcal per 100g</li>
                <li><strong>Fiber:</strong> 2.4g</li>
                <li><strong>Vitamin C:</strong> 14% DV</li>
                <li><strong>Potassium:</strong> 107mg</li>
              </ul>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="tab-pane">
              <p>Customer reviews will be displayed here soon. Our customers love the freshness of this {product.name}!</p>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="related-products mt-16">
          <h2 className="mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
