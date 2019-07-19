const updateModal = elem => {
  const id = elem.parentNode.id;
  const src = elem.src;
  const description = elem.alt;
  const modalBody = document.getElementById('modal-body');
  const modalLabel = document.getElementById('pin-modal-label');
  modalBody.innerHTML = `<img style="border-radius: 0.3rem;" class="img-fluid" src="${
    elem.src
  }"/>`;
  modalLabel.innerHTML = description;
};
