const makeAPost = async (event) => {
  event.preventDefault();
  console.log('clicked create');

  const postName = document.querySelector('#postName').value.trim();
  const postDesc = document.querySelector('#postDesc').value.trim();

  if (postName && postDesc) {
    const response = await fetch('/profile', {
      method: 'POST',
      body: JSON.stringify({ postName, postDesc }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // document.location.replace('/profile');
      console.log('clicked again?', postDesc);
    } else {
      alert(response.statusText);
    }
  }
};

document.getElementById('createPost').addEventListener('submit', makeAPost);
