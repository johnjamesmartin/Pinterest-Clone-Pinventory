const loadMasonryGrid = () => {
  let grid = document.querySelector('.grid');
  let msnry;
  imagesLoaded(grid, function() {
    // init Isotope after all images have loaded
    msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  });
};

loadMasonryGrid();
