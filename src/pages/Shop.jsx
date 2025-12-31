import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import products from '../data/products.json';
import categories from '../data/categories.json';
import ProductCard from '../components/product/ProductCard';
import './Shop.css';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [categoryFilter, searchQuery, sortBy]);

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="shop-page container py-16">
      <div className="shop-header">
        <div>
          <h1>Our Organic Shop</h1>
          <p>Showing {filteredProducts.length} results {searchQuery && `for "${searchQuery}"`}</p>
        </div>
        
        <div className="shop-controls">
          <button className="filter-toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <SlidersHorizontal size={20} />
            Filters
          </button>
          
          <div className="sort-wrapper">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown size={16} className="select-icon" />
          </div>
        </div>
      </div>

      <div className="shop-layout">
        <aside className={`shop-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="category-list">
              <button 
                className={categoryFilter === 'all' ? 'active' : ''}
                onClick={() => handleCategoryChange('all')}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={categoryFilter === cat.id ? 'active' : ''}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input type="number" placeholder="Min" />
              <span>-</span>
              <input type="number" placeholder="Max" />
            </div>
          </div>
        </aside>

        <main className="shop-content">
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Search size={48} />
              <h2>No products found</h2>
              <p>Try adjusting your filters or search query.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchParams({});
                  setSortBy('featured');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
