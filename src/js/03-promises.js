import Notiflix from 'notiflix';

const delayInput = document.querySelector("[name='delay']");
const stepInput = document.querySelector("[name='step']");
const amountInput = document.querySelector("[name='amount']");
const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })   
};

function handleSubmit(event) {
  event.preventDefault();

  let count = 1;
  let delayEl = +delayInput.value
  const stepInterval = setInterval(() => {
    if (count >= amountInput.value) {
     clearInterval(stepInterval)
    } 
      createPromise(count, delayEl)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
    count += 1;
    delayEl += +stepInput.value;
  }, 1)

};