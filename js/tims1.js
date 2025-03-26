const optionButtons = document.querySelectorAll('.option-button');
const confirmButton = document.getElementById('confirm-button');
let selectedAction = null;

optionButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 全ボタンリセット
    optionButtons.forEach(btn => btn.classList.remove('selected'));
    // 選択したボタンだけ黄色に
    button.classList.add('selected');
    selectedAction = button.getAttribute('data-action');
    // 設定ボタンを点滅開始
    confirmButton.classList.add('blinking');
  });
});

const soundop1 = new Audio('music/matinamiharuka.mp3')
const soundop2 = new Audio('music/tobi.mp3')
const soundop3 = new Audio('music/depa.mp3');

function operation1() {
  console.log("操作1 実行中...");
  soundop1.currentTime = 0;
  soundop1.play();
}
function operation2() {
  console.log("操作2 実行中...");
  soundop2.currentTime = 0;
  soundop2.play();
}
function operation3() {
  console.log("操作3 実行中...");
  soundop3.currentTime = 0;
  soundop3.play();
}

confirmButton.addEventListener('click', () => {
  if (selectedAction) {
    switch (selectedAction) {
      case 'operation1':
        operation1();
        break;
      case 'operation2':
        operation2();
        break;
      case 'operation3':
        operation3();
        break;
    }
    optionButtons.forEach(btn => btn.classList.remove('selected'));
    selectedAction = null;
    confirmButton.classList.remove('blinking');
  }
});