import '../css/timer.css';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const daysToCountdown = document.querySelector('[data-days]');
const hoursToCountdown = document.querySelector('[data-hours]');
const minutesToCountdown = document.querySelector('[data-minutes]');
const secondsToCountdown = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');

let count = null;
let isActive = false;
let intervalId = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: new Date(),
  onClose(selectedDates) {
    if(isActive){
      return
    }
    count = selectedDates[0].getTime();

    startBtn.disabled = false;
  }
})

startBtn.addEventListener('click', onStartBtnClick)

function onStartBtnClick(){
  if(isActive){
    return
  }

  if (count <= 0) {
    iziToast.show({
      color: 'red',
      title: 'Wrong time'
    })
    return
  }

  renderData(convertMs(count - new Date().getTime()))

  iziToast.show({
    color: 'blue',
    title:'Start of countdown'
  })

  isActive = true;
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    if(count <= 1000){
      iziToast.show({
        color: 'yellow',
        title: 'End of countdown'
      })
      clearInterval(intervalId)
      return
    }
    renderData(convertMs(count - new Date().getTime()))
  }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  let days = Math.floor(ms / day);
  // Remaining hours
  let hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  let minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  let seconds = Math.floor((((ms % day) % hour) % minute) / second);

  days = addLeadingZero(days);
  hours = addLeadingZero(hours);
  minutes = addLeadingZero(minutes);
  seconds = addLeadingZero(seconds);

  return {days, hours, minutes, seconds};
}

function addLeadingZero(value){
  if(value < 10){
    return String(value).padStart(2, '0')
  }

  return String(value)
}
function renderData({days, hours, minutes, seconds}) {
  daysToCountdown.innerHTML = days;
  hoursToCountdown.innerHTML = hours;
  minutesToCountdown.innerHTML = minutes;
  secondsToCountdown.innerHTML = seconds;
}
