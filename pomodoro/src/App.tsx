import React, {useState, useEffect, use} from 'react';
import logo from './logo.svg';
import './App.css'; 

import playImg from "./assets/play.png";
import resetImg from "./assets/reset.png";
import pauseImg from "./assets/pause.png";
import workBtnClicked from "./assets/work-clicked.png";
import workBtn from "./assets/work.png";
import breakBtnClicked from "./assets/break-clicked.png";
import breakBtn from "./assets/break.png";
import closeBtn from "./assets/close.png";

function App() {
  const [timeLeft, setTimeLeft] = useState(25*60);   // time thats remaining
  const [isRunning, setIsRunning] = useState(false);   // stores whether the timer is running or not
  const [breakButtonImage, setBreakButtonImage] = useState(breakBtn);   // break button
  const [workButtonImage, setWorkButtonImage] = useState(workBtn);   // work button
  const [isBreak, setIsBreak] = useState(false);   // break timer
  const [encouragement, setEncouragement] = useState("");   // encouragement text

  // encouragement text messages
  const cheerMessages = [
    "You can do it!",
    "I believe in you!",
    "You're amazing!",
    "Keep going!",
    "Stay focused!",
  ];
  const breakMessages = [
    "Stay hydrated!",
    "Go get your snacks!",
    "Text me!",
    "You're the best!",
    "Stretch your legs!",
  ];

  //  encouragement message updater
  useEffect (() => {
    let messageInterval: NodeJS.Timeout;


    if (isRunning) {
      // sets the first message initially
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]);
      let index = 1

      // changes the messages every 4 seconds
      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000);
    } else {
      setEncouragement("");
    }

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  // countdown timer
  // see if the timer is running and if the time is greater than zero
  useEffect( () => {
    let timer: NodeJS.Timeout;
    if (isRunning&&timeLeft > 0) {

      // reducing the timer by one second (1000ms)
      timer = setInterval( () => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return() => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // set initial switch mode to false
  useEffect(() => {
    switchMode(false);
  }, []);

  // progress bar
  const [totalTime, setTotalTime] = useState(25*60);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const percentage = (totalTime - timeLeft) / totalTime;
    setProgress(percentage)
  }, [timeLeft, totalTime]);

  // formatting the timer to have two digits for the minutes and seconds sections
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');

    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const switchMode = (breakMode: boolean) => {
    const newTotal = breakMode ? 5*60 : 25*60;
    setIsBreak(breakMode);
    setIsRunning(false);
    setTotalTime(newTotal);
    setTimeLeft(newTotal);
    setProgress(0);
    setBreakButtonImage(breakMode ? breakBtnClicked : breakBtn);
    setWorkButtonImage(breakMode ? workBtn : workBtnClicked)
  };

  // function when the reset button is clicked
  const handleReset = () => {
    const newTotal = isBreak ? 5*60 : 25*60;
    setIsRunning(false);
    setTimeLeft(newTotal);
    setProgress(0);
  };

  const containerClass = `home-container ${isRunning ? "background-green" : ""}`;

  return (
    <div className={containerClass} style={{position: 'relative'}}>
      <div>
        <div>
          <button className="close-button">
            <img src={closeBtn} alt="Close" />
          </button>
        </div>

        {/* timer buttons */}
        <div className="home-content">
          <div className="home-controls">
            <button className="image-button" onClick= { () => switchMode(false)}>
              <img src={workButtonImage} alt="Work" />
            </button>
            <button className="image-button" onClick= { () => switchMode(true)}>
              <img src={breakButtonImage} alt="Break" />
            </button>
          </div>
        
          {/* motivational text */}
          <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
            {encouragement}
          </p>

          {/* timer */}
          <h1 className="home-timer">{formatTime(timeLeft)}</h1>

          {/* progress bar */}
          <div className='progress' style={{width:'250px',border:'2px solid'}}>
            <div style={{height:'20px',background:'red',width:`${progress * 100}%`,transition:'width 1s linear'}}></div>
          </div>

          <div>
            {/* changes between start and pause when clicked */}
            <button className="home-button" onClick={ () => setIsRunning(!isRunning)}>
              <img src={isRunning ? pauseImg : playImg} />
            </button>

            <button className="home-button" onClick={handleReset}>
              <img src={resetImg} alt="Reset" />
            </button>
          </div>

        </div>
      </div>
    </div>

  );
}

export default App;
