import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // time thats remaining
  const [timeLeft, setTimeLeft] = useState(25*60);

  // stores whether the timer is running or not
  const [isRunning, setIsRunning] = useState(false);

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

  // function when the start button is clicked
  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(25*60);
    }
  }

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
            <button className="image-button">
              Work
            </button>
            <button className="image-button">
              Break
            </button>
          </div>
        </div>

        {/* motivational text */}
        <p>
          You can do it!
        </p>

        <h1 className="home-timer">{formatTime(timeLeft)}</h1>

        <button className="home-button" onClick={handleClick}>
          Start
        </button>
      </div>
    </div>

  );
}

export default App;
