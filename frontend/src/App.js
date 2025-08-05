// src/App.js
import React from 'react';
import InfoBar from './components/InfoBar';
import FeaturedDish from './components/FeaturedDish';
import FAQSection from './components/FAQSection';
import BulkOrderBanner from './components/BulkOrderBanner';
import ProgressBar from './components/ProgressBar';
import CountdownTimer from './components/CountdownTimer';
import NewsletterSignup from './components/NewsletterSignup';
import SocialProofBadges from './components/SocialProofBadges';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import OrderTimeline from './components/OrderTimeline';
import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';
import Highlights from './components/Highlights';
import OrderPage from './components/OrderPage'; 
import AdminLogin from './components/AdminLogin';
import AdminOrders from './components/AdminOrders';
import OrderStatusPage from './pages/OrderStatusPage';
import OrderHistory from './components/OrderHistory';
import Banner from './components/Banner';
import CustomerReviews from './components/CustomerReviews';
import ContactButton from './components/ContactButton';
import SpecialOffers from './components/SpecialOffers';
import SocialMediaLinks from './components/SocialMediaLinks';
import LiveChat from './components/LiveChat';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div style={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #fff0f0 0%, #f9f9ff 100%)',
              fontFamily: 'Segoe UI, Arial, sans-serif',
              paddingBottom: '60px',
            }}>
              <Header />
              <Banner />
              <InfoBar />
              <Highlights />
              <SpecialOffers />
              <FeaturedDish />
              <CountdownTimer />
              <BulkOrderBanner />
              <div id="products">
                <ProductList />
              </div>
              <SocialProofBadges />
              <CustomerReviews />
              <ProgressBar />
              <FAQSection />
              <NewsletterSignup />
              <section style={{
                margin: '30px 0',
                padding: '20px',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                maxWidth: '900px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                <HowItWorks />
              </section>
              <SocialMediaLinks />
              <ContactButton />
            </div>
          }
        />

        {/* Order Page */}
        <Route path="/how-we-work" element={<OrderTimeline />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/order/:productId" element={<OrderPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminOrders />} />
        <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
        {/* Order History Page */}
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
      <LiveChat />
      <Footer />
    </Router>
  );
}

export default App;
