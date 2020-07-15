import React, {useRef, useState} from 'react';
import './App.css';
import {padTime} from "./utils/utils";


function App() {
    const [title, setTitle] = useState("Let the countdown begin ^^");

    const [timeLeft, setTimeLeft] = useState(25 * 60);

    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef(null);

    function startTimer() {
        if (intervalRef.current !== null) return;
        setIsRunning(true);
        setTitle(`You're the best!`)
        intervalRef.current = setInterval(() => {
            setTimeLeft(timeLeft => {
                if (timeLeft >= 1) return timeLeft - 1;
                resetTimer();
                return 0;
            });
        }, 1000);
    }

    function stopTimer() {
        if (intervalRef.current === null) return;
        setTitle(`Isn't time to stop!`);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
    }

    function resetTimer() {
        setTitle("Are you ready to another round?");
        setTimeLeft(25 * 60);
        setIsRunning(false);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    const minutes = padTime(Math.floor(timeLeft / 60));

    const seconds = padTime(timeLeft - minutes * 60);

    return (
        <div className="App">
            <h2>{title}</h2>

            <div className="timer">
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>

            <div className="buttons">
                {!isRunning && <button onClick={startTimer}>Start</button>}
                {isRunning && <button onClick={stopTimer}>Stop</button>}
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

export default App;
