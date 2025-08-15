import React, {useState, useEffect, use} from 'react';
import logo from './logo.svg';
import './App.css'; 

function App() {
  // time thats remaining
  const [timeLeft, setTimeLeft] = useState(25*60);

  // stores whether the timer is running or not
  const [isRunning, setIsRunning] = useState(false);

  // break timer
  const [isBreak, setIsBreak] = useState(false);

  // encouragement text
  const [encouragement, setEncouragement] = useState("");

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

  // formatting the timer to have two digits for the minutes and seconds sections
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');

    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5*60 : 25*60);
  };

  // function when the reset button is clicked
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5*60 : 25*60);
  };

  // progress bar
  const progress = (30 - timeLeft) / 30;

  return (
    <div style={{position: 'relative'}}>
      <div>
        <div>
          <button className="closeButton">
            Close
          </button>
        </div>

        {/* timer buttons */}
        <div className="home-content">
          <div className="home-controls">
            <button className="image-button" onClick= { () => switchMode(false)}>
              Work
            </button>
            <button className="image-button" onClick= { () => switchMode(true)}>
              Break
            </button>
          </div>
        </div>

        {/* motivational text */}
        <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
          {encouragement}
        </p>

        <h1 className="home-timer">{formatTime(timeLeft)}</h1>

        {/* add progress bar here
        - have progress bar be able to start and reset when start button is clicked
        - possibly change start button to pause when clicked and add a reset button maybe (YERRRR)
        - progress bar has to last the same length (time-wise) as timer (use the timeLeft function)
        - progress bar has to pause when the pause button is clicked
        */}

        <div style={{width:'200px',border:'1px solid'}}>
          <div style={{height:'20px',background:'red',width:`${progress * 100}`}}></div>
        </div>

        {/* changes between start and pause when clicked */}
        <button className="home-button" onClick={ () => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>

        <button className="home-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>

  );
}

export default App;
