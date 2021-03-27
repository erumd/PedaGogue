const delButtonHandler = async (event) => {
  console.log('test delete');
  if (event.target.hasAttribute('name')) {
    const id = event.target.getAttribute('name');

    const response = await fetch(`/users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      console.log(response);
      alert('Failed to delete project');
    }
  }
};

$('.delete-btn').on('click', delButtonHandler);
