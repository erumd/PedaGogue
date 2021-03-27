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
  var postTopic = $('#postTopic').val();

  if (postName && postDesc) {
    const response = await fetch('/users/comments', {
      method: 'POST',
      body: JSON.stringify({ postName, postDesc, topicId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // document.location.replace('/profile');
      document.location.replace(`/topic/${postTopic}.val())/${topicId}`);
      console.log('This is sample of redirecting', topicId);
    } else {
      alert(response.statusText);
    }
  }
};

document.getElementById('createPost').addEventListener('click', makeAPost);
