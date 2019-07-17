#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

/* Dependencies
 *****************************************/
const async = require('async');
const mongoose = require('mongoose');
const mongoDB = userArgs[0];
const User = require('./models/user');
const Pin = require('./models/pin');
const Genre = require('./models/genre');

const categories = require('./categories');

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Arrays
 *****************************************/
let users = [];
let pins = [];
let genres = [];

/* Create a user:
 *****************************************/
const userCreate = (githubId, username, avatar, accessLevel, cb) => {
  userdetail = {
    githubId: githubId,
    username: username,
    avatar: avatar,
    accessLevel: accessLevel
  };

  const user = new User(userdetail);
  user.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('Created new user: ' + user);
    users.push(user);
    cb(null, user);
  });
};

/* Create a user:
 *****************************************/
const pinCreate = (imageUrl, description, user, genreIndex, savedBy, cb) => {
  pindetail = {
    imageUrl: imageUrl,
    description: description,
    user: users[Math.floor(Math.random() * users.length)],
    genre: genres[genreIndex],
    savedBy: savedBy
  };

  const pin = new Pin(pindetail);
  pin.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('Created new pin: ' + pin);
    pins.push(pin);
    cb(null, pin);
  });
};

/* Create a user:
 *****************************************/
const genreCreate = (name, cb) => {
  genredetail = {
    name: name
  };
  const genre = new Genre(genredetail);
  genre.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('Created new genre: ' + genre);
    genres.push(genre);
    cb(null, genre);
  });
};

const seedUsers = [
  {
    githubId: '28441',
    username: 'Someone',
    avatar: 'https://avatars0.githubusercontent.com/u/28441?v=4',
    accessLevel: 1
  },
  {
    githubId: '29063',
    username: 'johndoe',
    avatar: 'https://avatars2.githubusercontent.com/u/29063?v=4',
    accessLevel: 1
  },
  {
    githubId: '9187065',
    username: 'Username10',
    avatar: 'https://avatars0.githubusercontent.com/u/9187065?v=4',
    accessLevel: 1
  }
];

const seedPins = [
  {
    imageUrl: 'https://i.ibb.co/xMjpSJv/0gEkWmG.jpg',
    description: 'Ceiling of medieval castle in Cardiff, Wales',
    user: users[0],
    genre: 4,
    savedBy: ['29063', '9187065']
  },
  {
    imageUrl: 'https://i.ibb.co/Jx3QwHb/e3E5zsh.jpg',
    description: 'Sliding barn door interior',
    user: users[1],
    genre: 19,
    savedBy: ['9187065']
  },
  {
    imageUrl: 'https://i.ibb.co/SsHL3mx/nwlJ8Xv.jpg',
    description: 'Futuristic Japanese apartment',
    user: users[1],
    genre: 19,
    savedBy: ['9187065']
  },
  {
    imageUrl: 'https://i.ibb.co/VpmxZ5B/pnP5IYH.jpg',
    description: 'Cool looking Iranian mosque interior',
    user: users[1],
    genre: 4,
    savedBy: ['9187065']
  },
  {
    imageUrl: 'https://i.ibb.co/9HR6G90/R6Gp7Gr.jpg',
    description: 'Unique wooden stairwell',
    user: users[0],
    genre: 19,
    savedBy: ['29063']
  },
  {
    imageUrl: 'https://i.ibb.co/StyHCmN/ri7rxeD.jpg',
    description: 'Nature is awesome!',
    user: users[2],
    genre: 28,
    savedBy: []
  },
  {
    imageUrl: 'https://i.ibb.co/6nYzhsv/SHaiZ3m.jpg',
    description: 'Weird toilet',
    user: users[0],
    genre: 20,
    savedBy: []
  }
];

/* Async:: create users:
 *****************************************/
const createUsers = cb => {
  async.series(
    [
      callback => {
        userCreate(
          seedUsers[0].githubId,
          seedUsers[0].username,
          seedUsers[0].avatar,
          seedUsers[0].accessLevel,
          callback
        ); // 0
      },
      callback => {
        userCreate(
          seedUsers[1].githubId,
          seedUsers[1].username,
          seedUsers[1].avatar,
          seedUsers[1].accessLevel,
          callback
        ); // 1
      },
      callback => {
        userCreate(
          seedUsers[2].githubId,
          seedUsers[2].username,
          seedUsers[2].avatar,
          seedUsers[2].accessLevel,
          callback
        ); // 2
      }
    ],
    cb
  );
};

/* Async:: create genres:
 *****************************************/
const createGenres = cb => {
  async.series(
    [
      callback => {
        genreCreate('Everything', callback); // 0
      },
      callback => {
        genreCreate('Gifts', callback); // 1
      },
      callback => {
        genreCreate('Videos', callback); // 2
      },
      callback => {
        genreCreate('Animals & pets', callback); // 3
      },
      callback => {
        genreCreate('Architecture', callback); // 4
      },
      callback => {
        genreCreate('Art', callback); // 5
      },
      callback => {
        genreCreate('Cars & motorcycles', callback); // 6
      },
      callback => {
        genreCreate('Celebrations & events', callback); // 7
      },
      callback => {
        genreCreate('Celebritries', callback); // 8
      },
      callback => {
        genreCreate('DIY & crafts', callback); // 9
      },
      callback => {
        genreCreate('Design', callback); // 10
      },
      callback => {
        genreCreate('Education', callback); // 11
      },
      callback => {
        genreCreate('Entertainment', callback); // 12
      },
      callback => {
        genreCreate('Food & drink', callback); // 13
      },
      callback => {
        genreCreate('Gardening', callback); // 14
      },
      callback => {
        genreCreate('Geek', callback); // 15
      },
      callback => {
        genreCreate('Hair & beauty', callback); // 16
      },
      callback => {
        genreCreate('Health & fitness', callback); // 17
      },
      callback => {
        genreCreate('History', callback); // 18
      },
      callback => {
        genreCreate('Home decor', callback); // 19
      },
      callback => {
        genreCreate('Humour', callback); // 20
      },
      callback => {
        genreCreate('Illustrations & posters', callback); // 21
      },
      callback => {
        genreCreate('Kids & parenting', callback); // 22
      },
      callback => {
        genreCreate("Men's fashion", callback); // 23
      },
      callback => {
        genreCreate('Outdoors', callback); // 24
      },
      callback => {
        genreCreate('Photography', callback); // 25
      },
      callback => {
        genreCreate('Products', callback); // 26
      },
      callback => {
        genreCreate('Products', callback); // 27
      },
      callback => {
        genreCreate('Quotes', callback); // 28
      },
      callback => {
        genreCreate('Science & nature', callback); // 29
      },
      callback => {
        genreCreate('Sport', callback); // 30
      },
      callback => {
        genreCreate('Tattoos', callback); // 31
      },
      callback => {
        genreCreate('Technology', callback); // 32
      },
      callback => {
        genreCreate('Travel', callback); // 33
      },
      callback => {
        genreCreate('Weddings', callback); // 34
      },
      callback => {
        genreCreate("Women's fashion", callback); // 35
      }
    ],
    cb
  );
};

/* Async:: create pins:
 *****************************************/
const createPins = cb => {
  async.series(
    [
      callback => {
        pinCreate(
          seedPins[0].imageUrl,
          seedPins[0].description,
          seedPins[0].user,
          seedPins[0].genre,
          seedPins[0].savedBy,
          callback
        ); // 0
      },
      callback => {
        pinCreate(
          seedPins[1].imageUrl,
          seedPins[1].description,
          seedPins[1].user,
          seedPins[1].genre,
          seedPins[1].savedBy,
          callback
        ); // 1
      },
      callback => {
        pinCreate(
          seedPins[2].imageUrl,
          seedPins[2].description,
          seedPins[2].user,
          seedPins[2].genre,
          seedPins[2].savedBy,
          callback
        ); // 2
      },
      callback => {
        pinCreate(
          seedPins[3].imageUrl,
          seedPins[3].description,
          seedPins[3].user,
          seedPins[3].genre,
          seedPins[3].savedBy,
          callback
        ); // 3
      },
      callback => {
        pinCreate(
          seedPins[4].imageUrl,
          seedPins[4].description,
          seedPins[4].user,
          seedPins[4].genre,
          seedPins[4].savedBy,
          callback
        ); // 4
      },
      callback => {
        pinCreate(
          seedPins[5].imageUrl,
          seedPins[5].description,
          seedPins[5].user,
          seedPins[5].genre,
          seedPins[5].savedBy,
          callback
        ); // 5
      },
      callback => {
        pinCreate(
          seedPins[6].imageUrl,
          seedPins[6].description,
          seedPins[6].user,
          seedPins[6].genre,
          seedPins[6].savedBy,
          callback
        ); // 6
      }
    ],
    cb
  );
};

/* Drop all collections (removes all data)
 *****************************************/
const dropCollections = () => {
  User.collection.drop();
  Pin.collection.drop();
  Genre.collection.drop();
};

dropCollections();

/* Init::: Async series
 *****************************************/
async.series(
  [createGenres, createUsers, createPins],
  // Optional callback
  (err, results) => {
    if (err) {
      console.log('Error: ' + err);
    } else {
      //console.log('User created: ' + results);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
