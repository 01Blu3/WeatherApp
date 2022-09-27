const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

// messageOne.textContent = 'From JavaScript';

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log(search.value);
  const location = search.value;

  messageOne.textContent = 'loading...';

  // fetch is part of the browser API
  fetch(`/weather?address=${location}`).then(res =>
    res.json().then(data => {
      if (data.error) {
        messageOne.textContent = '';
        messageTwo.textContent = data.error;
        return;
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
      messageThree.textContent = data.airhum;
    })
  );
});
