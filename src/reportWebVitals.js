import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
  const reportWebVitals = onPerfEntry => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }
  };
});

export default reportWebVitals;
