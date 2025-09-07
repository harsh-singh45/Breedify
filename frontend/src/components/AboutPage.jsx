// frontend/src/components/AboutPage.jsx
import React from 'react';
import useOnScreen from '../hooks/useOnScreen'; // Import our new hook

// A small component to handle the fade-in animation logic
const AnimatedSection = ({ children }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <div ref={ref} className={`about-section-v2 ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="about-page-v2">
      {/* 1. Hero Section with Gradient Title */}
      <section className="about-hero-v2">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Revolutionizing</span> Livestock Management
          </h1>
          <p className="hero-tagline">
            Bringing AI-powered accuracy to India's cattle and buffalo breed identification.
          </p>
        </div>
      </section>

      {/* Angled Divider */}
      <div className="angled-divider"></div>

      {/* 2. Split Layout Section */}
      <AnimatedSection>
        <div className="split-layout">
          <div className="split-panel manual-side">
            <div className="split-icon">
              {/* Manual Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg>
            </div>
            <h2>The Manual Challenge</h2>
            <p>Human judgment, vast breed diversity, and inconsistent data entry lead to classification errors, affecting genetic improvement and policy decisions.</p>
          </div>
          <div className="split-panel ai-side">
            <div className="split-icon">
              {/* AI Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>
            </div>
            <h2>The AI Solution</h2>
            <p>Our AI-powered system uses image recognition for real-time, unbiased, and scientifically accurate breed classification, ready for non-technical field staff.</p>
          </div>
        </div>
      </AnimatedSection>
      
      {/* 3. Workflow Timeline */}
      <AnimatedSection>
        <h2>Our Workflow</h2>
        <div className="workflow-timeline">
          <div className="timeline-item">
            <div className="timeline-icon">1</div>
            <div className="timeline-content">
              <h3>Image Capture</h3>
              <p>Field staff capture an image using a simple mobile frontend.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">2</div>
            <div className="timeline-content">
              <h3>AI Analysis</h3>
              <p>The image is processed by our powerful CNN-based backend model.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">3</div>
            <div className="timeline-content">
              <h3>Real-time Results</h3>
              <p>Accurate breed classification is returned instantly to the device.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">4</div>
            <div className="timeline-content">
              <h3>Data Integration</h3>
              <p>Results are seamlessly synced with the Bharat Pashudhan App (BPA).</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. Impact Section */}
      <AnimatedSection>
        <h2>Impact & Benefits</h2>
        <div className="impact-grid-v2">
          <div className="impact-card-v2"><h3>Social</h3><p>Empowers farmers with reliable breed identification.</p></div>
          <div className="impact-card-v2"><h3>Economic</h3><p>Reduces costs and enhances farm profitability.</p></div>
          <div className="impact-card-v2"><h3>Environmental</h3><p>Preserves indigenous breeds and supports sustainability.</p></div>
          <div className="impact-card-v2"><h3>Technological</h3><p>Brings AI innovation to rural livestock management.</p></div>
        </div>
      </AnimatedSection>

    </div>
  );
};

export default AboutPage;