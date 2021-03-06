const loginFormHandler = async (event) => {
  console.log('login form handler ran');
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    console.log('example, getting login');
    // Send a POST request to the API endpoint

    const response = await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
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
  return false;
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

console.log(document.querySelector('.login-form'));
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
