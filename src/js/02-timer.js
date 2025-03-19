// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const refsDays = document.querySelector('[data-days]');
const refsHours = document.querySelector('[data-hours]');
const refsMins = document.querySelector('[data-minutes]');
const refsSecs = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', startTimer);
let selectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      btnStart.setAttribute('disabled', true);
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

function startTimer() {
  btnStart.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      selectedDate - Date.now()
    );
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds < 0) {
      Notify.success('time is out');
      clearInterval(timerId);
      input.removeAttribute('disabled');
      return;
    }
    refsDays.textContent = addLeadingZero(days);
    refsHours.textContent = addLeadingZero(hours);
    refsMins.textContent = addLeadingZero(minutes);
    refsSecs.textContent = addLeadingZero(seconds);
  }, 1000);
}
flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
