import React, {useState} from 'react';
import './styles.css';

var interval = null;

let [milliseconds, seconds, minutes, hours, days] = [0,0,0,0,0];
let [dMilliseconds, dSeconds, dMinutes, dHours, dDays] = ["","","","",""];

function timer() {
    milliseconds += 10;
    if(milliseconds >= 1000) {
        seconds += 1;
        milliseconds = 0;
    }
    if(seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    if(minutes >= 60) {
        hours += 1;
        minutes = 0;
    }
    if(hours >= 24) {
        days += 1;
        hours = 0;
    }
    days < 10 ? dDays = "0" + days : dDays = days;
    hours < 10 ? dHours = "0" + hours : dHours = hours;
    minutes < 10 ? dMinutes = "0" + minutes : dMinutes = minutes;
    seconds < 10 ? dSeconds = "0" + seconds : dSeconds = seconds;

    milliseconds < 100 ? dMilliseconds = "0" + milliseconds : dMilliseconds = milliseconds;
}

function Stopwatch() {
    const [time, setTime] = useState({days: "00",
                                    hours: "00",
                                    minutes: "00",
                                    seconds: "00",
                                    milliseconds: "000"});
    
    const buttons = {
        startFunction: function(){
            if(interval) return;
            interval = setInterval(()=>{
                timer()
                setTime({days: dDays,
                        hours: dHours,
                        minutes: dMinutes,
                        seconds: dSeconds,
                        milliseconds: dMilliseconds});
            }, 10);
        },
        stopFunction: function(){
            clearInterval(interval);
            interval = null;
        },
        resetFunction: function(){
            buttons.stopFunction();
            milliseconds = 0;
            seconds = 0;
            minutes = 0;
            hours = 0;
            days = 0;
            setTime({days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                    milliseconds: "000"});
        }
    }

    return (
    <div className='container'>
        <h1>Stopwatch React</h1>
        <div id="display_box">
            <span id="Days">{time.days}<p>Days</p></span>:
            <span id="Hours">{time.hours}<p>Hours</p></span>:
            <span id="Minutes">{time.minutes}<p>Minutes</p></span>:
            <span id="Seconds">{time.seconds}<p>Seconds</p></span>:
            <span id="Milliseconds">{time.milliseconds}<p>Milliseconds</p></span>
        </div>
        <div className='buttons_container'>
            <input type={'button'} value="Start" onClick={buttons.startFunction}/>
            <input type={'button'} value="Stop" onClick={buttons.stopFunction}/>
            <input type={'button'} value="Reset" onClick={buttons.resetFunction}/>
        </div>
    </div>
  );
}

export default Stopwatch;