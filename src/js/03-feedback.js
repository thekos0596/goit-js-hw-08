import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form  textarea'),
};

refs.form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
});
refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onTextareaInput(evt) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function populateTextarea() {
  const savedEmail = parsedData.email;
  const savedMessage = parsedData.message;
  if (parsedData) {
    refs.email.value = savedEmail;
    refs.message.value = savedMessage;
  }
}
