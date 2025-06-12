window.addEventListener('load', () => {
  startLiveTime();
});

const clock = document.querySelector('#analogClock');

clock.addEventListener('click', () => {
  stopLiveTime();
  generateRandomTime();
});

const liveTimeBtn = document.querySelector('.start-live-time');
liveTimeBtn.addEventListener('click', () => {
  stopLiveTime();
  startLiveTime();
});

for (let i = 0; i < 30; i++) {
  const groupMark = document.createElement('div');
  clock.appendChild(groupMark);
  groupMark.classList.add('group');
}

const marks = document.querySelectorAll('.group');
for (let i = 0; i < marks.length; i++) {
  marks[i].style.transform = `rotate(${i * 6}deg)`;

  if (i === 0 || i % 5 === 0) {
    const firstMark = document.createElement('div');
    marks[i].appendChild(firstMark);
    firstMark.classList.add('mark');
    if (i === 0) {
      firstMark.textContent = `12`;
    } else {
      firstMark.textContent = `${i / 5}`;
    }
    const lastMark = document.createElement('div');
    marks[i].appendChild(lastMark);
    lastMark.classList.add('mark');
    lastMark.textContent = `${i / 5 + 6}`;
    const hourMarks = marks[i].querySelectorAll('.mark');
    hourMarks.forEach((el) => {
      el.style.transform = `rotate(-${i * 6}deg)`;
    });
  }
}
const hourHand = document.createElement('div');
const minuteHand = document.createElement('div');
const secondHand = document.createElement('div');
const circle = document.createElement('div');

hourHand.classList.add('hour-hand');
clock.appendChild(hourHand);
minuteHand.classList.add('minute-hand');
clock.appendChild(minuteHand);
secondHand.classList.add('second-hand');
clock.appendChild(secondHand);
circle.classList.add('circle');
clock.appendChild(circle);

const hour = document.querySelector('.hour-hand');
const minute = document.querySelector('.minute-hand');
const second = document.querySelector('.second-hand');

let d = new Date();
let htime = d.getHours();
let mtime = d.getMinutes();
let stime = d.getSeconds();

let displayLiveTime;

function startLiveTime() {
  displayLiveTime = setInterval(setLiveTime, 1000);
}

function stopLiveTime() {
  clearInterval(displayLiveTime);
}

function setLiveTime() {
  d = new Date();
  stime = d.getSeconds();
  mtime = d.getMinutes();
  htime = d.getHours();
  updateTime();
}

function randBetween(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomTime() {
  stime = randBetween(1, 60);
  mtime = randBetween(1, 60);
  htime = randBetween(1, 12);
  updateTime();
}

function updateTime() {
  let clockColor = `lch(60% 120 ${stime * 6} / 1)`;
  clock.style.setProperty('--clockColor', clockColor);
  second.style.transform = `rotate(${6 * stime}deg)`;
  minute.style.transform = `rotate(${6 * mtime}deg)`;
  hour.style.transform = `rotate(${30 * htime + mtime / 2}deg)`;
}

let isSecondDisplay = true;
const toggleSecondBtn = document.querySelector('.toggle-second');
toggleSecondBtn.addEventListener('click', () => {
  isSecondDisplay = !isSecondDisplay;
  second.classList.toggle('hidden');
  if (isSecondDisplay) {
    toggleSecondBtn.textContent = 'Hide second';
  } else {
    toggleSecondBtn.textContent = 'Show second';
  }
});
