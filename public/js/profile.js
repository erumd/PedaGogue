const makeAPost = async (event) => {
  event.preventDefault();
  console.log('clicked create', $('#postTopic').val());
  var topicId;

  if ($('#postTopic').val() === 'ELA') {
    topicId = 1;
  }
  if ($('#postTopic').val() === 'STEM') {
    topicId = 2;
  }
  if ($('#postTopic').val() === 'Social Studies') {
    topicId = 3;
  }
  if ($('#postTopic').val() === 'Classroom Management') {
    topicId = 4;
  }
  if ($('#postTopic').val() === 'Electives') {
    topicId = 5;
  }
  if ($('#postTopic').val() === 'Free Resources') {
    topicId = 6;
  }
  if ($('#postTopic').val() === 'Parent Communication') {
    topicId = 7;
  }

  const postName = document.querySelector('#postName').value.trim();
  const postDesc = document.querySelector('#postDesc').value.trim();

  if (postName && postDesc) {
    const response = await fetch('/users/comments', {
      method: 'POST',
      body: JSON.stringify({ postName, postDesc, topicId }),
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

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('name')) {
//     const id = event.target.getAttribute('name');

//     const response = await fetch(`/user${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/topic');
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };

document.getElementById('createPost').addEventListener('click', makeAPost);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
