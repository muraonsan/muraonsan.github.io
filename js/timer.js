let timerInterval;
let timeRemaining;

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

function startTimer() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (minutes === 0 && seconds === 0) {
        alert("時間を設定してください。");
        return;
    }

    if (timerInterval) return;

    timeRemaining = minutes * 60 + seconds;

    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerDisplay = document.getElementById('timer');
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;

    if (timeRemaining > 0) {
        timeRemaining--;
    } else {
        stopTimer();
        alert("時間になりました！");
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    timeRemaining = 0;
    document.getElementById('timer').textContent = '00:00';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
}