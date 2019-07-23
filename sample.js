/*
Permission levels:
-------------------
  0 = Banned
  1 = Basic
  2 = Admin
  3 = Super
*/

/* Sample data (users and pins):
 *****************************************/
const sample = {
  // users:
  users: [
    {
      githubId: '7034814',
      username: 'johnjamesmartin',
      avatar: 'https://avatars1.githubusercontent.com/u/7034814?v=4',
      accessLevel: 3,
      pinsSubmitted: 3
    },
    {
      githubId: '28441',
      username: 'Someone',
      avatar: 'https://avatars0.githubusercontent.com/u/28441?v=4',
      accessLevel: 1,
      pinsSubmitted: 3
    },
    {
      githubId: '29063',
      username: 'johndoe',
      avatar: 'https://avatars2.githubusercontent.com/u/29063?v=4',
      accessLevel: 1,
      pinsSubmitted: 1
    },
    {
      githubId: '9187065',
      username: 'Username10',
      avatar: 'https://avatars0.githubusercontent.com/u/9187065?v=4',
      accessLevel: 0,
      pinsSubmitted: 0
    }
  ],
  // pins:
  pins: [
    {
      imageUrl: 'https://i.ibb.co/xMjpSJv/0gEkWmG.jpg',
      description: 'Ceiling of medieval castle in Cardiff, Wales',
      user: 0,
      genre: 4,
      savedBy: []
    },
    {
      imageUrl: 'https://i.ibb.co/Jx3QwHb/e3E5zsh.jpg',
      description: 'Sliding barn door interior',
      user: 1,
      genre: 19,
      savedBy: []
    },
    {
      imageUrl: 'https://i.ibb.co/SsHL3mx/nwlJ8Xv.jpg',
      description: 'Futuristic Japanese apartment',
      user: 1,
      genre: 19,
      savedBy: []
    },
    {
      imageUrl: 'https://i.ibb.co/VpmxZ5B/pnP5IYH.jpg',
      description: 'Cool looking Iranian mosque interior',
      user: 1,
      genre: 4,
      savedBy: []
    },
    {
      imageUrl: 'https://i.ibb.co/9HR6G90/R6Gp7Gr.jpg',
      description: 'Unique wooden stairwell',
      user: 0,
      genre: 19,
      savedBy: []
    },
    {
      imageUrl: 'https://i.ibb.co/StyHCmN/ri7rxeD.jpg',
      description: 'Nature is awesome!',
      user: 2,
      genre: 29,
      savedBy: []
    },
    {
      imageUrl:
        'https://www.askideas.com/media/35/Raccoon-Say-I-Am-Taking-The-Cat-Funny-Animal-Meme-Image.jpg',
      description: 'Made me laugh',
      user: 0,
      genre: 20,
      savedBy: []
    },
    {
      imageUrl: 'https://s3.amazonaws.com/noupe/2010/02/3-art.jpg',
      description: 'Deep and wonderful piece of art',
      user: 2,
      genre: 5,
      savedBy: []
    },
    {
      imageUrl:
        'https://cdn.pixabay.com/photo/2012/04/24/18/29/school-40847_1280.png',
      description: 'Bacteria diagram',
      user: 3,
      genre: 29,
      savedBy: []
    },
    {
      imageUrl:
        'https://hips.hearstapps.com/wdy.h-cdn.co/assets/16/20/wd_fb_quote101.jpg',
      description: 'Mark Twain quote I like',
      user: 3,
      genre: 28,
      savedBy: []
    },
    {
      imageUrl:
        'https://images-o.jpimedia.uk/imagefetch/w_700,f_auto,ar_3:2,q_auto:low,c_fill/if_h_lte_200,c_mfit,h_201/https://www.newsletter.co.uk/webimage/1.8764288.1547074446!/image/image.jpg',
      description: 'Go Belfast Giants!',
      user: 2,
      genre: 30,
      savedBy: []
    },
    {
      imageUrl:
        'https://www.tattoo-models.net/wp-content/uploads/2017/03/skin.jpg',
      description: 'Best tattoo I have seen in a while',
      user: 1,
      genre: 31,
      savedBy: []
    },
    {
      imageUrl:
        'https://cstad.s3-ap-southeast-2.amazonaws.com/3126__Luxury_SriLanka-Maldives_Hero.jpg',
      description: 'Sri Lanka looks lovely',
      user: 0,
      genre: 33,
      savedBy: []
    },
    {
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pYrL9ySd6069OzMojbjoQC4KZ_sBEHF7t9mptN5BtD4avqZ6',
      description: 'Labradors make wonderful pets',
      user: 0,
      genre: 3,
      savedBy: []
    },
    {
      imageUrl:
        'https://s3.amazonaws.com/luckiescdn/wp-content/uploads/2016/06/28083853/Smart-Phone-Projector-DIY-LS-08-620x620.jpg',
      description: 'DIY smartphone projector',
      user: 3,
      genre: 9,
      savedBy: []
    },
    {
      imageUrl:
        'https://i.etsystatic.com/10628367/r/il/2b0782/1710463528/il_570xN.1710463528_613k.jpg',
      description: 'These posters <3',
      user: 0,
      genre: 1,
      savedBy: []
    }
  ]
};

//

const shuffle = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

sample.pins = shuffle(sample.pins);

module.exports = sample;
