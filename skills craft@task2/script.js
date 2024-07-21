// script.js

let timer = null;
let isRunning = false;
let startTime = 0;
let totalPausedTime = 0;
let lapStartTime = 0;
let lapNumber = 1;

function startStop() {
    if (!isRunning) {
        startTimer();
        document.getElementById('startStopButton').innerText = 'Pause';
        document.getElementById('lapResetButton').innerText = 'Lap';
    } else {
        pauseTimer();
        document.getElementById('startStopButton').innerText = 'Resume';
        document.getElementById('lapResetButton').innerText = 'Reset';
    }
}

function startTimer() {
    isRunning = true;
    startTime = Date.now() - totalPausedTime;
    lapStartTime = startTime;
    timer = setInterval(updateDisplay, 10);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
    totalPausedTime += Date.now() - startTime;
}

function lapReset() {
    if (isRunning) {
        recordLap();
    } else {
        resetTimer();
    }
}

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    const timeFormatted = formatTime(currentTime);
    document.getElementById('display').innerText = timeFormatted;
}

function recordLap() {
    const currentTime = Date.now();
    const lapTime = currentTime - lapStartTime;
    lapStartTime = currentTime;

    const lapTimeFormatted = formatTime(lapTime);
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapNumber}: ${lapTimeFormatted}`;
    document.getElementById('laps').prepend(lapItem);
    lapNumber++;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    totalPausedTime = 0;
    lapStartTime = 0;
    lapNumber = 1;

    document.getElementById('display').innerText = '00:00:00.000';
    document.getElementById('startStopButton').innerText = 'Start';
    document.getElementById('lapResetButton').innerText = 'Lap';
    document.getElementById('laps').innerHTML = '';
}

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = time % 1000;

    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`;
}

function pad(num, size) {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
}
