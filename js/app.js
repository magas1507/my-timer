const timerElement = document.getElementById('timer');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const exerciseElement = document.getElementById('exercise');
const completeExerciseBtn = document.getElementById('completeExercise');

const apiKey = "EziF0vjSGSzDvyod/Wp3tw==Uq5lrqSDKB4OwCNp";
const typeEx = "stretching";
let offset = 0;
let url = `https://api.api-ninjas.com/v1/exercises?type=${typeEx}&offset=${offset}`;

let exercisesList = [];
let currentExercise = 0;
let minutes = 1;
let seconds = 0;
let timerInterval;
let timerRunning = false;

function startTimer() {
    timerRunning = true;
    timerInterval = setInterval(updateTime, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

function updateTime() {
    if (seconds === 0) {
        if (minutes === 0) {
            stopTimer();
            showCompleteExerciseButton(); 
            fetchAndDisplayExercise(); 
            return;
        }
        seconds = 59;
        minutes--;
    } else {
        seconds--;
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    const totalTime = 25 * 60; 
    const elapsedTime = totalTime - (minutes * 60 + seconds);
    const percentage = (elapsedTime / totalTime) * 100;
   // fillerElement.style.height = `${percentage}%`;
}

async function fetchAndDisplayExercise() {
    
    if (timerRunning) {
        return;
    }

    try {
        const exercises = await getExercises(url, apiKey);
        exercisesList = exercises;
        showNextExercise();
    } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
    }
}

function showNextExercise() {
    if (exercisesList.length === 0) {
        console.log('Não há mais exercícios para mostrar.');
        return;
    }
    currentExercise = Math.floor(Math.random() * exercisesList.length);
    exerciseElement.textContent = exercisesList[currentExercise].name;

    
}

function showCompleteExerciseButton() {
    completeExerciseBtn.style.display = 'block'; 
}

completeExerciseBtn.addEventListener('click', () => {
    completeExercise();
});

function completeExercise() {
    if (exercisesList.length === 0) {
        console.log('Não há exercícios para concluir.');
        return;
    }
    exercisesList.splice(currentExercise, 1);
    showNextExercise();
    completeExerciseBtn.style.display = 'none';
}

startTimer();

document.getElementById('shortBreak').addEventListener('click', () => {
    minutes = 5; 
    seconds = 0;
    startTimer();
});

document.getElementById('longBreak').addEventListener('click', () => {
    minutes = 15; 
    seconds = 0;
    startTimer();
});

document.getElementById('stop').addEventListener('click', () => {
    stopTimer();
});
getExercises().then(() => {
    fetchAndDisplayExercise();
});