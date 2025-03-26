function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ja-JP');
    document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000); // 1秒ごとに更新

// 初回読み込み時に実行
updateClock();