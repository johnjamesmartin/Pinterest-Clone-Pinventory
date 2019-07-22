/* Construct save button
 *****************************************/
const ConstructSaveButton = (label, iconPrefix, id) => {
  const span = `<span>${label} </span>`;
  const style = 'font-size: 20px;';
  const icon = `<i class="${iconPrefix} fa-heart" id="i-${id}" style="${style}" />`;
  return span + icon;
};

/* Toggle pin save:
 *****************************************/
const togglePinSave = e => {
  // Get pin id, cache the button element and its text
  const id = e.target.parentNode.id.split('-')[1];
  const element = document.getElementById(`btnsave-${id}`);
  const txt = element.children[0].innerHTML.trim();

  if (txt === 'Save') alert('Saved pin!');

  // Prevent form submitting
  e.preventDefault();

  // Post a request to toggle saving the pin
  fetch(`/pins/save/${id}`, { method: 'POST' }).then(response => {
    // Toggle markup
    element.innerHTML =
      txt === 'Save'
        ? ConstructSaveButton('Unsave', 'fas', id)
        : ConstructSaveButton('Save', 'far', id);
    // Return response
    return response.json();
  });
};

/* Remove pin from favourites:
 *****************************************/
const removeFavourite = e => {
  // Get pin id, cache the button element and its parent tr index (table row)
  const id = e.target.parentNode.id.split('-')[1];
  const element = document.getElementById(`pindelete-${id}`);

  // Prevent form submitting
  e.preventDefault();
  // Post a request to remove pin from favourites
  fetch(`/users/removefavourite/${id}`, { method: 'POST' })
    .then(response => {
      element.parentNode.innerHTML = 'Removed!';
      return response.json();
    })
    .then(myJson => {
      console.log(JSON.stringify(myJson));
    });
};

const removePin = e => {
  const id = e.target.parentNode.id.split('-')[1];
  const element = document.getElementById(`pindelete-${id}`);

  const confirmation = confirm(
    'Are you sure you want to delete this pin?\n\nThis action cannot be undone!'
  );

  // Prevent form submitting
  e.preventDefault();

  if (confirmation) {
    // Post a request to delete pin
    fetch(`/pins/delete/${id}`, { method: 'POST' })
      .then(response => {
        element.parentNode.innerHTML = 'Deleted!';
        return response.json();
      })
      .then(myJson => {
        console.log(JSON.stringify(myJson));
      });
  }
};
