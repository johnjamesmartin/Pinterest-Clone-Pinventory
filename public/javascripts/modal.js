/* Update modal:
 *****************************************/
const updateModal = elem => {
  //
  const id = elem.parentNode.id;
  const src = elem.src;

  const description = elem.alt;
  const modalBody = document.getElementById('modal-body');
  const modalLabel = document.getElementById('pin-modal-label');
  const linkPin = `<a href="#">Visit pin page</a>`;
  const linkProfile = `<a href="#">Vist user profile</a>`;
  const subtitle = `<p class="modal-subtitle-p">${linkPin} • ${linkProfile}</p>`;
  const img = `<img class="img-fluid modal-img" src="${elem.src}"/>`;

  // Write to modal:
  modalBody.innerHTML = `${subtitle}${img}`;
  modalLabel.innerHTML = description;
};
