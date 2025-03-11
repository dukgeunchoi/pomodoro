const startElement = document.getElementById("start")
const stopElement = document.getElementById("stop")
const resetElement = document.getElementById("reset")
const timerElement = document.getElementById("timer")

let interval
let timeLeft = 1500;

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    timerElement.innerHTML = formattedTime;
}

function startTimer() {
    interval = setInterval(()=> {
        if (timeLeft === 0) {
            clearInterval(interval);
            alert("Times up!")
            timeLeft = 1500;
            updateTimer();
            return;
        }
        timeLeft--;
        updateTimer();
    }, 1000)
}
function stopTimer() {
    clearInterval(interval);
}
function resetTimer() {
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
}

startElement.addEventListener("click", startTimer);
stopElement.addEventListener("click", stopTimer);
resetElement.addEventListener("click", resetTimer);

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
showTask();