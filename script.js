const startElement = document.getElementById("start")
const stopElement = document.getElementById("stop")
const resetElement = document.getElementById("reset")
const timerElement = document.getElementById("timer")
const pomodoroElement = document.getElementById("pomodoro")
const shortBreakElement = document.getElementById("shortbreak")
const longBreakElement = document.getElementById("longbreak")

const alarmSound = new Audio("audio/alarm.mp3");

let interval;
let timeLeft;
let curr = "pomodoro";
let prev = "";

function setPomodoroTimer() {
    clearInterval(interval)
    timeLeft = 1500;
    updateTimer();
    curr = "pomodoro";
    pomodoroElement.style.background = "white";
    pomodoroElement.style.color = "black";
    shortBreakElement.style.background = "transparent";
    shortBreakElement.style.color = "white";
    longBreakElement.style.background = "transparent";
    longBreakElement.style.color = "white";
    prev = "pomodoro";
}

function setShortBreakTimer() {
    clearInterval(interval)
    timeLeft = 300;
    updateTimer();
    curr = "shortbreak";
    pomodoroElement.style.background = "transparent";
    pomodoroElement.style.color = "white";
    shortBreakElement.style.background = "white";
    shortBreakElement.style.color = "black";
    longBreakElement.style.background = "transparent";
    longBreakElement.style.color = "white";
    prev = "shortbreak";
}

function setLongBreakTimer() {
    clearInterval(interval)
    timeLeft = 900;
    updateTimer();
    curr = "longbreak";
    pomodoroElement.style.background = "transparent";
    pomodoroElement.style.color = "white";
    shortBreakElement.style.background = "transparent";
    shortBreakElement.style.color = "white";
    longBreakElement.style.background = "white";
    longBreakElement.style.color = "black";
    prev = "longbreak";
}

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    timerElement.innerHTML = formattedTime;
}

function startTimer() {
    if (prev === "start") return;
    interval = setInterval(()=> {
        if (timeLeft === 0) {
            alarmSound.play();
            
            setTimeout(() => {
                alert("Time's up!");
                alarmSound.pause();
                alarmSound.currentTime = 0;
            }, 100); 

            setTimer();
            return;
        }
        timeLeft--;
        updateTimer();
    }, 1000)
    prev = "start";
}

function stopTimer() {
    clearInterval(interval);
    prev = "stop";
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    setTimer();
    prev = "reset";
}

function setTimer() {
    if (curr === "pomodoro") setPomodoroTimer();
    if (curr === "shortbreak") setShortBreakTimer();
    if (curr === "longbreak") setLongBreakTimer();
} 

startElement.addEventListener("click", startTimer);
stopElement.addEventListener("click", stopTimer);
resetElement.addEventListener("click", resetTimer);
pomodoroElement.addEventListener("click", setPomodoroTimer);
shortBreakElement.addEventListener("click", setShortBreakTimer);
longBreakElement.addEventListener("click", setLongBreakTimer);

const inputBox = document.getElementById("input-box");
const listContainter = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Enter task");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainter.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}

listContainter.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainter.innerHTML);
}

function showTask() {
    listContainter.innerHTML = localStorage.getItem("data");
}

setPomodoroTimer();
showTask();