import React, { useState, useEffect } from 'react';

function FullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Full-screen toggle handler
  const handleFullScreen = () => {
    const element = document.documentElement; // Full page element

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  // Listen for changes in full-screen mode
  useEffect(() => {
    const onFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true); // Full screen mode
      } else {
        setIsFullScreen(false); // Exit full screen mode
      }
    };

    document.addEventListener('fullscreenchange', onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange); // Safari/Chrome
    document.addEventListener('mozfullscreenchange', onFullScreenChange); // Firefox
    document.addEventListener('msfullscreenchange', onFullScreenChange); // Internet Explorer/Edge

    // Cleanup the event listeners
    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullScreenChange);
      document.removeEventListener('mozfullscreenchange', onFullScreenChange);
      document.removeEventListener('msfullscreenchange', onFullScreenChange);
    };
  }, []);

  return (
    <div className="app-1">
      <button
        onClick={handleFullScreen}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: isFullScreen ? 'none' : 'block', // Hide button when in full screen
        }}
      >
        Go Full Screen
      </button>
    </div>
  );
}

export default FullScreen;
