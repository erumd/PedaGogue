const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('name')) {
    const id = event.target.getAttribute('name');

    const response = await fetch(`/user${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/topic');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
