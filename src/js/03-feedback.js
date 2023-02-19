import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

updateOutput();

form.addEventListener(
  'input',
  throttle(event => {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

function updateOutput() {
  if (load(STORAGE_KEY)) {
    const outputForm = load(STORAGE_KEY);
    const formKeys = Object.keys(outputForm);
    formKeys.map(element => {
      document.querySelector(`[name='${element}']`).value = outputForm[element];
    });
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.console.error(error.message);
  }
}

form.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(event) {
  event.preventDefault();
  console.log(load(STORAGE_KEY));
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
