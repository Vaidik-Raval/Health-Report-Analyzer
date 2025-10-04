// AOS animation utility functions
import AOS from 'aos';

/**
 * Refreshes AOS animations with a slight delay to ensure DOM is ready
 * Use this when you need to refresh animations after component updates
 */
export const refreshAnimations = () => {
  setTimeout(() => {
    AOS.refresh();
  }, 100);
};

/**
 * Adds staggered animations to a group of elements
 * @param {string} selector - CSS selector for the elements to animate
 * @param {string} animation - Animation name (e.g., 'fade-up', 'zoom-in')
 * @param {number} baseDelay - Starting delay in ms
 * @param {number} increment - Delay increment per element in ms
 */
export const addStaggeredAnimations = (selector, animation = 'fade-up', baseDelay = 100, increment = 50) => {
  setTimeout(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.setAttribute('data-aos', animation);
      el.setAttribute('data-aos-delay', (baseDelay + (index * increment)).toString());
    });
    AOS.refresh();
  }, 100);
};

/**
 * Updates AOS configuration at runtime
 * @param {Object} config - AOS configuration object
 */
export const updateAOSConfig = (config) => {
  AOS.refresh(true);
  Object.keys(config).forEach(key => {
    AOS.settings[key] = config[key];
  });
  AOS.refresh();
};

/**
 * Hook to detect low-performance devices and disable animations
 */
export const checkPerformance = () => {
  // Check if device is low-end (you can expand this logic)
  const isLowEndDevice = () => {
    return window.navigator.hardwareConcurrency < 4 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  
  if (isLowEndDevice()) {
    updateAOSConfig({ disable: true });
  }
};

/**
 * Apply animation to dynamically loaded content
 * @param {HTMLElement} container - Container element with new content
 */
export const animateDynamicContent = (container) => {
  if (!container) return;
  
  const elements = container.querySelectorAll('[data-aos]');
  elements.forEach(el => {
    el.classList.add('aos-animate');
  });
};