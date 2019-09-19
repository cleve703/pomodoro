var sessionDisplay = document.getElementById('session-time');
var breakTime = document.getElementById('break-time');
var timeStatus = document.getElementById('status');
var timerDisplay = document.getElementById('current-time');
var playButton = document.getElementById('play');
var resetButton = document.getElementById('reset');
var pauseButton = document.getElementById('pause');
var stopButton = document.getElementById('stop');
var sessionPlusButton = document.getElementById('session-plus');
var sessionMinusButton = document.getElementById('session-minus');
var breakPlusButton = document.getElementById('break-plus');
var breakMinusButton = document.getElementById('break-minus');

var sessionTimeSet = 1500;
var sessionTimeLock;
var sessionCountdown;
var breakTimeSet = 300;
var breakTimeLock;
var breakCountdown;
var sessionStatus = "Session";
var timeArray = [];
var timerActive = false;


function secsToMins(arg) {
    var mins = Math.floor(arg/60);
    var secs = Math.floor(arg % 60);
    secs = secs.toString();
    while (secs.length < 2) {secs = ("0" + secs)};
    timeArray = [mins, secs];
    return timeArray;
};

function setInitialValues() {
    sessionTimeLock = sessionTimeSet;
    breakTimeLock = breakTimeSet;
    sessionDisplay.innerHTML = secsToMins(sessionTimeLock)[0];
    breakTime.innerHTML = secsToMins(breakTimeLock)[0];
    timeStatus.innerHTML = sessionStatus;
    timerDisplay.innerHTML = `${secsToMins(sessionTimeSet)[0]}:${secsToMins(sessionTimeSet)[1]}`
}

setInitialValues()

function sessionPlus() {
    sessionTimeSet += 60;
    sessionDisplay.innerHTML = secsToMins(sessionTimeSet)[0];
    if (timerActive == false) {
        sessionTimeLock = sessionTimeSet;
        timerDisplay.innerHTML = `${secsToMins(sessionTimeLock)[0]}:${secsToMins(sessionTimeLock)[1]}`;
    }
};

function sessionMinus() {
    if ((sessionTimeSet - 60) > 0) {
        sessionTimeSet -= 60;
        sessionDisplay.innerHTML = secsToMins(sessionTimeSet)[0];
        if (timerActive == false) {
            sessionTimeLock = sessionTimeSet;
            timerDisplay.innerHTML = `${secsToMins(sessionTimeLock)[0]}:${secsToMins(sessionTimeLock)[1]}`;
        }
    }
};

function breakPlus() {
    breakTimeSet += 60;
    breakTime.innerHTML = secsToMins(breakTimeSet)[0];
};

function breakMinus() {
    if ((breakTimeSet - 60) > 0) {
        breakTimeSet -= 60;
        breakTime.innerHTML = secsToMins(breakTimeSet)[0];
    }
};

function stopTime() {
    sessionTimeLock = sessionTimeSet;
    breakTimeLock = breakTimeSet;
    clearInterval(timerPeriod);
    sessionStatus = "Session";
    timerDisplay.innerHTML = `${secsToMins(sessionTimeLock)[0]}:${secsToMins(sessionTimeLock)[1]}`
    timerActive = false;
    playButton.addEventListener('click', startTime, {once:true});
};

function pauseTime() {
    clearInterval(timerPeriod);
    playButton.addEventListener('click', startTime, {once:true});
};

function resetTime() {
    sessionTimeSet = 1500;
    breakTimeSet = 300;
    clearInterval(timerPeriod);
    setInitialValues();
    timerActive = false;
    playButton.addEventListener('click', startTime, {once:true});
};

function startTime() {
    timerPeriod = setInterval(myTimer, 100)
    if (timerActive == false) {
        sessionCountdown = sessionTimeLock;
        breakCountdown = breakTimeLock;
    }
    timerActive = true;
};

function refresh() {
    sessionStatus
}

function myTimer() {
    if (sessionStatus == "Session") {
        timerDisplay.innerHTML = `${secsToMins(sessionCountdown)[0]}:${secsToMins(sessionCountdown)[1]}`
        sessionCountdown -= .1;
        if (sessionCountdown < .1) {
            sessionStatus = "Break"
            timeStatus.innerHTML = sessionStatus
            clearInterval(timerPeriod)
            timerActive = false;
            startTime()
        }
        else {
        timerDisplay.innerHTML = `${secsToMins(sessionCountdown)[0]}:${secsToMins(sessionCountdown)[1]}`
    };
    }
    else if (sessionStatus == "Break") {
        timerDisplay.innerHTML = `${secsToMins(breakCountdown)[0]}:${secsToMins(breakCountdown)[1]}`
        breakCountdown -= .1;
        if (breakCountdown < .1) {
            sessionStatus = "Session"
            timeStatus.innerHTML = sessionStatus
            clearInterval(timerPeriod)
            timerActive = false;
            startTime()
        }
        else {
        timerDisplay.innerHTML = `${secsToMins(breakCountdown)[0]}:${secsToMins(breakCountdown)[1]}`
        };
    };
};

stopButton.addEventListener('click', stopTime);
pauseButton.addEventListener('click', pauseTime);
resetButton.addEventListener('click', resetTime);
playButton.addEventListener('click', startTime, {once:true});
sessionPlusButton.addEventListener('click', sessionPlus);
sessionMinusButton.addEventListener('click', sessionMinus);
breakPlusButton.addEventListener('click', breakPlus);
breakMinusButton.addEventListener('click', breakMinus);
