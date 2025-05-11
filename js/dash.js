// script.js

// 現在時刻をリアルタイムで更新
function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const dayOfWeek = now.getDay(); // 0=日曜日, 1=月曜日, ..., 6=土曜日
  
    // 曜日を日本語で表す配列
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  
    // 桁を揃える関数
    const padZero = (num) => String(num).padStart(2, '0');
  
    const formatted = `${year}年${padZero(month)}月${padZero(day)}日（${weekDays[dayOfWeek]}）` +
                      `${padZero(hours)}時${padZero(minutes)}分${padZero(seconds)}秒`;
  
    document.getElementById('current-time').textContent = formatted;
  }
  setInterval(updateTime, 1000);
  updateTime(); // 最初に即実行
  
// 天気情報を取得して表示
function fetchWeather() {
    const apiKey = '3041d2d94778e856aa9474ddef7a5d1e';
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      document.getElementById('current-weather').textContent = "位置情報が取得できませんでした。";
      document.getElementById('tomorrow-weather').textContent = "位置情報が取得できませんでした。";
    }
  
    function successCallback(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      // 現在の天気
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${apiKey}`;
      fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
          const weather = data.weather[0].description;
          const temp = Math.round(data.main.temp);
          const icon = data.weather[0].icon;
  
          document.getElementById('current-weather').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="天気アイコン" style="vertical-align:middle;">
            <span>現在：${weather}　${temp}℃</span>
          `;
        })
        .catch(error => {
          console.error("現在の天気取得エラー:", error);
          document.getElementById('current-weather').textContent = "天気情報が取得できませんでした。";
        });
  
      // 明日の天気
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${apiKey}`;
      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          const tomorrowData = data.list.find(item => item.dt_txt.includes('12:00:00'));
  
          if (tomorrowData) {
            const weather = tomorrowData.weather[0].description;
            const temp = Math.round(tomorrowData.main.temp);
            const icon = tomorrowData.weather[0].icon;
  
            document.getElementById('tomorrow-weather').innerHTML = `
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="天気アイコン" style="vertical-align:middle;">
              <span>明日：${weather}　${temp}℃</span>
            `;
          } else {
            document.getElementById('tomorrow-weather').textContent = "明日の天気情報が取得できませんでした。";
          }
        })
        .catch(error => {
          console.error("明日の天気取得エラー:", error);
          document.getElementById('tomorrow-weather').textContent = "天気予報が取得できませんでした。";
        });
    }
  
    function errorCallback(error) {
      console.error("位置情報取得エラー:", error);
      document.getElementById('current-weather').textContent = "位置情報の取得を許可してください。";
      document.getElementById('tomorrow-weather').textContent = "位置情報の取得を許可してください。";
    }
  }
  
  // ページ読み込み時に実行
  fetchWeather();
  
  
  // ニュースを取得 (仮の例)
  function fetchNews() {
    const apiKey = 'd1dc9319bc174dc0ac4e7ab06a2862ae';
    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("News APIのレスポンス内容:", data);
        const list = document.getElementById('news-list');
        list.innerHTML = '';
  
        data.articles.forEach(article => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
          list.appendChild(li);
        });
      })
      .catch(error => {
        console.error("ニュース取得エラー:", error);
        document.getElementById('news-list').innerHTML = '<li>ニュースを取得できませんでした。</li>';
      });
  }
  
  fetchNews();

  //タイマーの部分
  let timerInterval;
  let remainingSeconds = 0;
  let isPaused = false;
  
  function startTimer() {
    const minutesInput = document.getElementById("timer-minutes");
    if (!isPaused) {
      const minutes = parseInt(minutesInput.value);
      if (isNaN(minutes) || minutes <= 0) {
        alert("分数を入力してください");
        return;
      }
      remainingSeconds = minutes * 60;
    }
    isPaused = false;
    updateTimerDisplay();
  
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateTimerDisplay();
        if (remainingSeconds === 0) {
          clearInterval(timerInterval);
          alert("時間です！");
        }
      }
    }, 1000);
  }
  
  function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    remainingSeconds = 0;
    isPaused = false;
    updateTimerDisplay();
  }
  
  function updateTimerDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    document.getElementById("timer-display").textContent =
      `残り時間：${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  if (remainingSeconds <= 0) {
    clearInterval(timerInterval);
    remainingSeconds = 0;
    updateDisplay();
  
    // 🔔音を鳴らす
    const sound = document.getElementById('timerSound');
    sound.play();
  }
  