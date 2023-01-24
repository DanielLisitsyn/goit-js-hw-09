import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = 0;
btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
        Notiflix.Notify.failure("Please choose a date in the future");
        btnEl.disabled = true;
        return
    }
    btnEl.disabled = false;

    btnEl.addEventListener('click', handleBtnStart);

    function handleBtnStart() {
      timerId = setInterval(updateTimer, 1000)
      btnEl.disabled = true;
    };

    function updateTimer() {
      let difference = selectedDates[0] - new Date();
      const objTime = convertMs(difference);

      daysEl.textContent = objTime.days < 10 ? '0' + objTime.days : objTime.days;
      hoursEl.textContent = objTime.hours < 10 ? '0' + objTime.hours : objTime.hours;
      minutesEl.textContent = objTime.minutes < 10 ? '0' + objTime.minutes : objTime.minutes;
      secondsEl.textContent = objTime.seconds < 10 ? '0' + objTime.seconds : objTime.seconds;

      if (difference < 999) {
        clearInterval(timerId)
      }
      
    }
    },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};


