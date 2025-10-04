import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tailwind.css';
import './styles/global.css';
import './styles/animations.css';
import './i18n';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

import { LoadingProvider } from './context/LoadingContext.jsx';

// Initialize AOS with optimized settings
AOS.init({
  duration: 800,
  once: false,
  mirror: true,
  offset: 100,
  delay: 100,
  easing: 'ease-in-out',
  anchorPlacement: 'top-bottom',
  // Disable animations on mobile devices with poor performance
  disable: window.innerWidth < 768 && 'mobile',
  // Update animations on window resize
  debounceDelay: 50,
  throttleDelay: 99,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div style={{ padding: 20, textAlign: 'center' }}>Loading translations...</div>}>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </Suspense>
  </React.StrictMode>,
);