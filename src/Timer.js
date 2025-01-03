import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';
import sound from './sounds/endgame.mp3';
import FullScreen from './Fullscreen';
import './App.css';

function Timer() {
  const [time, setTime] = useState(150); // 2:30 = 150 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  // Create a reference for the timer sound
  const timerSound = useRef(new Audio(sound));

  // Timer logic
  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);

        if (time === 30) {
          setIsAlert(true); // Trigger the alert animation when 30 seconds are left
        }
      }, 1000);
    } else if (time === 0) {
      // Play the sound once when the timer ends
      timerSound.current.play();
      setIsRunning(false);
      setIsAlert(false);

      // Automatically reset the timer after the sound ends
      timerSound.current.onended = handleReset;
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Handle Reset
  const handleReset = () => {
    setTime(150);
    setIsRunning(false);
    setIsAlert(false);
    timerSound.current.pause(); // Stop sound if it's still playing
    timerSound.current.currentTime = 0; // Reset sound position to the start
  };

  return (
    <div className="app">
      <div className="header">
        <img
          src={logo}
          alt="Logo"
          className="logo"
        />
      </div>

      <div className="timer">
        <div className={`timer-circle ${isAlert ? 'alert' : ''}`}>
          <div className='timer-circle-inner'>
            <h1>{formatTime(time)}</h1>
            <p>ROBOT GAME</p>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button
          className="start-button"
          onClick={() => {
            if (!isRunning) {
              setIsRunning(true);
            }
          }}
          disabled={isRunning || time === 0}
        >
          СТАРТ
        </button>
        <button
          className="reset-button"
          onClick={handleReset}
        >
          СБРОС
        </button>

      </div>
      <FullScreen />
    </div>
  );
}

export default Timer;
