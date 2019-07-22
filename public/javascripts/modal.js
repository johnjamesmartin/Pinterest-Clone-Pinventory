/* Update modal:
 *****************************************/
const updateModal = elem => {
  //

  const id = elem.parentNode.id;
  const src = elem.src;

  const description = elem.alt.split('-')[0];
  const modalBody = document.getElementById('modal-body');
  const modalLabel = document.getElementById('pin-modal-label');
  const linkIcon = `<span class="text-muted"><i class="fas fa-link"></i></span>`;
  const linkPin = `<a href="/pins/${id}">Visit pin page</a>`;
  const linkProfile = `Pin by <a href="/users/profile/${
    elem.alt.split('-')[1]
  }">${elem.alt.split('-')[1]}</a>`;
  const subtitle = `<p class="modal-subtitle-p">${linkProfile} ${linkIcon} ${linkPin}</p>`;
  const img = `<img class="img-fluid modal-img" src="${elem.src}"/>`;

  // Write to modal:
  modalBody.innerHTML = `${subtitle}${img}`;
  modalLabel.innerHTML = description;
};
