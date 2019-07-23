/* Refine grid by certain properties:
 *****************************************/
const refineGrid = () => {
  const genre = document.getElementById('refine-genre-select').value;
  const user = document.getElementById('refine-user-select').value;
  const gridItems = document.getElementsByClassName('grid-item');

  const pinsNotice = document.getElementById('pins-notice');
  pinsNotice.style.display = 'none';

  // Cycle through grid items, and display those of the category selected:
  var count = 0;

  for (let i = 0; i < gridItems.length; i++) {
    let itemGenreElem = gridItems[i].children[2].children[1];
    let itemGenreTxt = itemGenreElem.innerHTML.trim();
    let gridItem = itemGenreElem.parentNode.parentNode;
    let itemUserElem = gridItem.children[4].children[1];
    let itemUserTxt = itemUserElem.innerHTML.trim();

    const hasGenre = () => genre === itemGenreTxt || genre == 'Everything';
    const hasUser = () => user === itemUserTxt || user == 'All';

    if (hasGenre() && hasUser()) {
      gridItem.style.display = 'block';
      count += 1;
    } else {
      gridItem.style.display = 'none';
    }

    loadMasonryGrid();
  }
  if (count === 0) pinsNotice.style.display = 'block';
};
