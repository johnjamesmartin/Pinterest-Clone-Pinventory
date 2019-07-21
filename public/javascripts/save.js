const preventSubmitRefresh = e => {
  const id = e.target.parentNode.id.split('-')[1];
  const element = document.getElementById(`btnsave-${id}`);
  const txt = element.children[0].innerHTML.trim();

  e.preventDefault();
  fetch(`/pins/save/${id}`, { method: 'POST' })
    .then(response => {
      if (txt === 'Save') {
        element.innerHTML =
          '<span>Unsave </span><i class="fas fa-heart" id="i-' +
          id +
          '" style="font-size: 20px"/>';
      } else {
        element.innerHTML =
          '<span>Save </span><i class="far fa-heart" id="i-' +
          id +
          '" style="font-size: 20px"/>';
      }
      return response.json();
    })
    .then(myJson => {
      console.log(JSON.stringify(myJson));
    });
};
