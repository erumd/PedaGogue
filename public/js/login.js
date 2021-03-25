console.log('Hello World');

const loginFormHandler = async (event) => {
  console.log('login form handler ran');
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && email && password) {
    console.log('example, getting login');
    // Send a POST request to the API endpoint
    const response = await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/topicList');
    } else {
      alert(response.statusText);
    }
  } else {
    console.log(
      'missing information',
      `Username:${username} Email${email} pass:${password}`
    );
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // if (name && username && email && password) {
  if (name && username && email && password) {
    const response = await fetch('/users', {
      method: 'POST',
      body: JSON.stringify({ name, username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/topicList');
    } else {
      alert(response.statusText);
    }
  }
};

// document
//   .querySelector('.login-form')
//   .addEventListener('submit', loginFormHandler);

// added event listerner to button not form

console.log(document.querySelector('.login-button'));
document
  .querySelector('.login-button')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
