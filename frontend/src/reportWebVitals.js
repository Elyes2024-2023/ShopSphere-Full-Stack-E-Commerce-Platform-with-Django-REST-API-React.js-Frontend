const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
      // Cumulative Layout Shift (CLS)
      getCLS(onPerfEntry);
      
      // First Input Delay (FID)
      getFID(onPerfEntry);
      
      // Largest Contentful Paint (LCP)
      getLCP(onPerfEntry);
      
      // First Contentful Paint (FCP)
      getFCP(onPerfEntry);
      
      // Time to First Byte (TTFB)
      getTTFB(onPerfEntry);

      // Additional performance metrics
      const performance = window.performance;
      if (performance) {
        // Navigation Timing
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          onPerfEntry({
            name: 'DOMContentLoaded',
            value: navigation.domContentLoadedEventEnd - navigation.navigationStart,
          });
          onPerfEntry({
            name: 'Load',
            value: navigation.loadEventEnd - navigation.navigationStart,
          });
        }

        // Resource Timing
        const resources = performance.getEntriesByType('resource');
        resources.forEach((resource) => {
          onPerfEntry({
            name: `Resource: ${resource.name}`,
            value: resource.duration,
          });
        });

        // Memory Usage (if supported)
        if (performance.memory) {
          onPerfEntry({
            name: 'Memory Usage',
            value: performance.memory.usedJSHeapSize,
          });
        }
      }
    });
  }
};

export default reportWebVitals;
