import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Globe, Award } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            We're on a Mission to <br /><span>Nourish the World</span>
          </motion.h1>
          <p>OrganiCo started with a simple idea: everyone deserves access to real, honest food.</p>
        </div>
      </section>

      <section className="about-content container py-16">
        <div className="about-grid">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=800&auto=format&fit=crop" alt="Our Farm" />
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>Founded in 2010, OrganiCo began as a small family garden. We saw how industrial farming was impacting our health and the environment, and we decided to make a change.</p>
            <p>Today, we partner with over 50 local farmers who share our commitment to regenerative agriculture, soil health, and biodiversity.</p>
            <div className="about-stats">
              <div className="stat">
                <h3>50+</h3>
                <p>Local Farms</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Organic</p>
              </div>
              <div className="stat">
                <h3>10k+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values bg-muted py-16">
        <div className="container">
          <h2 className="text-center mb-4">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="value-card">
              <Leaf className="value-icon" />
              <h3>Sustainability</h3>
              <p>We believe in leaving the earth better than we found it through regenerative practices.</p>
            </div>
            <div className="value-card">
              <Users className="value-icon" />
              <h3>Community</h3>
              <p>Supporting local growers and building a healthier community for everyone.</p>
            </div>
            <div className="value-card">
              <Award className="value-icon" />
              <h3>Quality</h3>
              <p>Only the freshest, highest-quality produce makes it from our farms to your table.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
