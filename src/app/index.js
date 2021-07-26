import localforage from 'localforage';

window.onload = () => {
  localforage
    .getItem('text', function (err, value) {})
    .then((res) => (textArea.value = res));
};
let button = document.getElementById('convert');
let intervalID;
let switchButton = document.getElementById('switchCase');

switchButton.addEventListener('click', () => {
  if (textArea.style.backgroundColor === 'rgb(51, 51, 51)') {
    textArea.style.backgroundColor = '#fff';
    textArea.style.color = '#333';
  } else {
    textArea.style.backgroundColor = '#333';
    textArea.style.color = '#fff';
  }
});

class Timer {
  #isTimerGoes;
  constructor(buttonStart, timerInput) {
    this.timerStart = document.getElementById(buttonStart);
    this.timerValue = document.getElementById(timerInput);
    this.timerValue.defaultValue = '00:30:00';
    this.#isTimerGoes = false;
    this.timerStart.addEventListener('click', () => {
      if (!this.#isTimerGoes) {
        this.start();
      } else {
        this.stop();
      }
    });
  }
  static #formatTime(time) {
    if (Math.abs(time) < 10) return '0' + time;
    return time;
  }

  start() {
    this.#isTimerGoes = true;
    this.timerStart.innerText = 'Стоп';
    let rawTime = this.timerValue.value.toString();
    rawTime = rawTime.split(':');
    let hours = +rawTime[0] | 0;
    let minutes = +rawTime[1] | 0;
    let seconds = +rawTime[2] | 0;
    this.#tick(hours, minutes, seconds);
  }
  stop() {
    this.#isTimerGoes = false;
    this.timerStart.innerText = 'Старт';
    clearInterval(intervalID);
  }
  #tick(hours, minutes, seconds) {
    let stringTime =
      Timer.#formatTime(hours) +
      ':' +
      Timer.#formatTime(minutes) +
      ':' +
      Timer.#formatTime(seconds);
    this.timerValue.value = stringTime;

    intervalID = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        if (minutes === 0 && hours === 0) {
          this.stop();
          alert('Timer Out!');
        }
        if (minutes === 0) {
          hours--;
          minutes = 60;
        }
        minutes--;
        seconds = 59;
      }

      stringTime =
        Timer.#formatTime(hours) +
        ':' +
        Timer.#formatTime(minutes) +
        ':' +
        Timer.#formatTime(seconds);
      this.timerValue.value = stringTime;
    }, 1000);
  }
}

let timer = new Timer('button timer', 'timerCounter', 'timerOutput');

button.addEventListener('click', () => {
  let textBox = document.getElementById('textArea');
  let text = textBox.value;
  textBox.value = text.replaceAll(' \n', '\n');
});

function countSymbols(text) {
  let total = 0;
  for (let char of text) if (char !== ' ') total++;
  return total;
}

function updateSymbols() {
  let textBox = document.getElementById('textArea');
  let text = textBox.value;
  document.getElementById('totalSymbols').innerText = text.length;
  document.getElementById('totalClearSymbols').innerText = countSymbols(text);
}

function getSelectionText() {
  let text = '';
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== 'Control') {
    text = document.selection.createRange().text;
  }
  return text;
}

function handleSelection() {
  const selectedSymbols = document.getElementById('selectedSymbols');
  const text = getSelectionText();
  if (text) selectedSymbols.innerText = text.length;
  else selectedSymbols.innerText = countSymbols(text);
}

let textArea = document.getElementById('textArea');
textArea.addEventListener('input', () => {
  updateSymbols();
  localforage.setItem('text', textArea.value, (err, value) => {});
});

document.addEventListener('selectionchange', () => {
  if (textArea === document.activeElement) handleSelection();
});

const isLetter = (c) => c.toLowerCase() !== c.toUpperCase();
