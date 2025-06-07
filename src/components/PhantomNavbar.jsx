import React, { useState, useEffect } from "react";
import './PhantomNavbar.css';

const PhantomNavbar = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, "", "/");
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .phantom-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .phantom-nav.scrolled {
          padding: 12px 40px;
          background: rgba(0, 0, 0, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .phantom-logo {
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          text-decoration: none;
          letter-spacing: -0.02em;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .phantom-logo:hover {
          transform: translateY(-1px);
        }
        
        .phantom-logo::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
          transition: width 0.3s ease;
        }
        
        .phantom-logo:hover::after {
          width: 100%;
        }
        
        .nav-right {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        
        .sound-wrapper {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .sound-wrapper:hover {
          color: #4ecdc4;
        }
        
        .sound-bars {
          display: flex;
          margin-right: 12px;
          height: 16px;
          align-items: flex-end;
          gap: 2px;
        }
        
        .sound-bar {
          width: 2px;
          height: 100%;
          background: #ffffff;
          transform-origin: bottom;
          border-radius: 1px;
          transition: all 0.3s ease;
        }
        
        .sound-wrapper:hover .sound-bar {
          background: #4ecdc4;
        }
        
        .sound-bar.active {
          animation: soundWave 1.2s ease-in-out infinite;
        }
        
        .sound-bar:nth-child(1) { animation-delay: 0s; }
        .sound-bar:nth-child(2) { animation-delay: 0.1s; }
        .sound-bar:nth-child(3) { animation-delay: 0.2s; }
        .sound-bar:nth-child(4) { animation-delay: 0.3s; }
        .sound-bar:nth-child(5) { animation-delay: 0.4s; }
        
        .sound-bar.inactive {
          opacity: 0.3;
          transform: scaleY(0.5);
        }
        
        @keyframes soundWave {
          0%, 100% { 
            transform: scaleY(0.4);
            opacity: 0.7;
          }
          50% { 
            transform: scaleY(1.2);
            opacity: 1;
          }
        }
        
        .phantom-button {
          background: #ffffff;
          color: #000000;
          border: none;
          border-radius: 50px;
          padding: 12px 24px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .phantom-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .phantom-button:hover::before {
          left: 100%;
        }
        
        .phantom-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
        }
        
        .phantom-button:active {
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .phantom-nav {
            padding: 16px 20px;
          }
          
          .phantom-nav.scrolled {
            padding: 12px 20px;
          }
          
          .nav-right {
            gap: 20px;
          }
          
          .phantom-logo {
            font-size: 20px;
          }
          
          .phantom-button {
            padding: 10px 20px;
            font-size: 13px;
          }
          
          .sound-wrapper {
            font-size: 10px;
          }
        }
      `}</style>
      
      <nav className={`phantom-nav ${isScrolled ? 'scrolled' : ''}`}>
        <a href="/" onClick={handleLogoClick} className="phantom-logo">
          PHANTOM
        </a>

        <div className="nav-right">
          <div className="sound-wrapper" onClick={toggleSound}>
            <div className="sound-bars">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div 
                  key={bar} 
                  className={`sound-bar ${isSoundOn ? 'active' : 'inactive'}`}
                />
              ))}
            </div>
            <span>SOUND [{isSoundOn ? "ON" : "OFF"}]</span>
          </div>
          <button className="phantom-button">
            Заказать
          </button>
        </div>
      </nav>
      
      {/* Demo content to show scroll effect */}
      <div style={{ 
        height: '200vh', 
        background: 'linear-gradient(180deg, #000000 0%, #111111 50%, #000000 100%)',
        paddingTop: '100px',
        color: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '0 20px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: '700' }}>
            Scroll to see the navbar effect
          </h1>
          <p style={{ opacity: 0.7, lineHeight: '1.6' }}>
            This navbar is inspired by phantom.land with smooth animations, 
            backdrop blur effects, and modern typography. The sound visualizer 
            responds to interactions and the entire nav adapts to scroll position.
          </p>
        </div>
      </div>
    </>
  );
};

export default PhantomNavbar;