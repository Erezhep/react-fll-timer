import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';
import sound from './sounds/match_end.mp3';
import sound_start from './sounds/match_start.mp3';
import sound_30 from './sounds/time30.mp3';
import sound_second_3 from './sounds/second3.mp3';
import FullScreen from './Fullscreen';
import './App.css';

function Timer() {
  const [time, setTime] = useState(150); // 2:30 = 150 секунд
  const [isRunning, setIsRunning] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertPlayed, setAlertPlayed] = useState(false); // Состояние для звука 30 секунд
  const [finalCountdownPlayed, setFinalCountdownPlayed] = useState(false); // Состояние для звука 3 секунды

  // Создаем ссылки на звуки
  const timerSoundEnd = useRef(new Audio(sound));
  const timerSoundStart = useRef(new Audio(sound_start));
  const timeSound30 = useRef(new Audio(sound_30));
  const timeSoundSecond3 = useRef(new Audio(sound_second_3));

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 31 && !alertPlayed) {
            setIsAlert(true);
            timeSound30.current.play();
            setAlertPlayed(true);
          }
          if (prevTime === 4 && !finalCountdownPlayed) {
            timeSoundSecond3.current.play();
            setFinalCountdownPlayed(true);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    if (time === 0) {
      timerSoundEnd.current.play();
      setIsRunning(false);
      setIsAlert(false);
      timerSoundEnd.current.onended = handleReset; // Автосброс после окончания звука
    }

    return () => clearInterval(timer);
  }, [isRunning, time, alertPlayed, finalCountdownPlayed]);

  const handleReset = () => {
    setTime(150);
    setIsRunning(false);
    setIsAlert(false);
    setAlertPlayed(false);
    setFinalCountdownPlayed(false);

    // Сброс звуков
    timerSoundEnd.current.pause();
    timerSoundEnd.current.currentTime = 0;
    timerSoundStart.current.pause();
    timerSoundStart.current.currentTime = 0;
    timeSound30.current.pause();
    timeSound30.current.currentTime = 0;
    timeSoundSecond3.current.pause();
    timeSoundSecond3.current.currentTime = 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="app">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="timer">
        <div className={`timer-circle ${isAlert ? 'alert' : ''}`}>
          <div className="timer-circle-inner">
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
              timerSoundStart.current.play(); // Звук старта
            }
          }}
          disabled={isRunning || time === 0}
        >
          СТАРТ
        </button>
        <button className="reset-button" onClick={handleReset}>
          СБРОС
        </button>
      </div>
      <FullScreen />
    </div>
  );
}

export default Timer;
