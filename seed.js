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

const sample = require('./sample');

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
const userCreate = (
  githubId,
  username,
  avatar,
  accessLevel,
  pinsSubmitted,
  cb
) => {
  userdetail = {
    githubId: githubId,
    username: username,
    avatar: avatar,
    accessLevel: accessLevel,
    pinsSubmitted: pinsSubmitted
  };
  const user = new User(userdetail);
  user.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`Created new user: ${user}`);
    users.push(user);
    cb(null, user);
  });
};

/* Create a user:
 *****************************************/
const pinCreate = (
  imageUrl,
  description,
  userIndex,
  genreIndex,
  savedBy,
  cb
) => {
  console.log('----------');
  console.log('Users:');
  console.log(users[userIndex]);
  console.log('---------');

  pindetail = {
    imageUrl: imageUrl,
    description: description,
    user: users[userIndex],
    userInfo: users[userIndex].username,
    genreInfo: genres[genreIndex].name,
    genre: genres[genreIndex],
    savedBy: savedBy
  };
  const pin = new Pin(pindetail);
  pin.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`Created new pin: ${pin}`);
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
    console.log(`Created new genre: ${genre}`);
    genres.push(genre);
    cb(null, genre);
  });
};

/* Async:: create users:
 *****************************************/
const createUsers = cb => {
  async.series(
    [
      callback => {
        userCreate(
          sample.users[0].githubId,
          sample.users[0].username,
          sample.users[0].avatar,
          sample.users[0].accessLevel,
          sample.users[0].pinsSubmitted,
          callback
        ); // 0
      },
      callback => {
        userCreate(
          sample.users[1].githubId,
          sample.users[1].username,
          sample.users[1].avatar,
          sample.users[1].accessLevel,
          sample.users[1].pinsSubmitted,
          callback
        ); // 1
      },
      callback => {
        userCreate(
          sample.users[2].githubId,
          sample.users[2].username,
          sample.users[2].avatar,
          sample.users[2].accessLevel,
          sample.users[2].pinsSubmitted,
          callback
        ); // 2
      },
      callback => {
        userCreate(
          sample.users[3].githubId,
          sample.users[3].username,
          sample.users[3].avatar,
          sample.users[3].accessLevel,
          sample.users[3].pinsSubmitted,
          callback
        ); // 3
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
        genreCreate('Projects', callback); // 27
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
          sample.pins[0].imageUrl,
          sample.pins[0].description,
          sample.pins[0].user,
          sample.pins[0].genre,
          sample.pins[0].savedBy,
          callback
        ); // 0
      },
      callback => {
        pinCreate(
          sample.pins[1].imageUrl,
          sample.pins[1].description,
          sample.pins[1].user,
          sample.pins[1].genre,
          sample.pins[1].savedBy,
          callback
        ); // 1
      },
      callback => {
        pinCreate(
          sample.pins[2].imageUrl,
          sample.pins[2].description,
          sample.pins[2].user,
          sample.pins[2].genre,
          sample.pins[2].savedBy,
          callback
        ); // 2
      },
      callback => {
        pinCreate(
          sample.pins[3].imageUrl,
          sample.pins[3].description,
          sample.pins[3].user,
          sample.pins[3].genre,
          sample.pins[3].savedBy,
          callback
        ); // 3
      },
      callback => {
        pinCreate(
          sample.pins[4].imageUrl,
          sample.pins[4].description,
          sample.pins[4].user,
          sample.pins[4].genre,
          sample.pins[4].savedBy,
          callback
        ); // 4
      },
      callback => {
        pinCreate(
          sample.pins[5].imageUrl,
          sample.pins[5].description,
          sample.pins[5].user,
          sample.pins[5].genre,
          sample.pins[5].savedBy,
          callback
        ); // 5
      },
      callback => {
        pinCreate(
          sample.pins[6].imageUrl,
          sample.pins[6].description,
          sample.pins[6].user,
          sample.pins[6].genre,
          sample.pins[6].savedBy,
          callback
        ); // 6
      },
      callback => {
        pinCreate(
          sample.pins[7].imageUrl,
          sample.pins[7].description,
          sample.pins[7].user,
          sample.pins[7].genre,
          sample.pins[7].savedBy,
          callback
        ); // 7
      },
      callback => {
        pinCreate(
          sample.pins[8].imageUrl,
          sample.pins[8].description,
          sample.pins[8].user,
          sample.pins[8].genre,
          sample.pins[8].savedBy,
          callback
        ); // 8
      },
      callback => {
        pinCreate(
          sample.pins[9].imageUrl,
          sample.pins[9].description,
          sample.pins[9].user,
          sample.pins[9].genre,
          sample.pins[9].savedBy,
          callback
        ); // 9
      },
      callback => {
        pinCreate(
          sample.pins[10].imageUrl,
          sample.pins[10].description,
          sample.pins[10].user,
          sample.pins[10].genre,
          sample.pins[10].savedBy,
          callback
        ); // 10
      },
      callback => {
        pinCreate(
          sample.pins[11].imageUrl,
          sample.pins[11].description,
          sample.pins[11].user,
          sample.pins[11].genre,
          sample.pins[11].savedBy,
          callback
        ); // 11
      },
      callback => {
        pinCreate(
          sample.pins[12].imageUrl,
          sample.pins[12].description,
          sample.pins[12].user,
          sample.pins[12].genre,
          sample.pins[12].savedBy,
          callback
        ); // 12
      },
      callback => {
        pinCreate(
          sample.pins[13].imageUrl,
          sample.pins[13].description,
          sample.pins[13].user,
          sample.pins[13].genre,
          sample.pins[13].savedBy,
          callback
        ); // 13
      },
      callback => {
        pinCreate(
          sample.pins[14].imageUrl,
          sample.pins[14].description,
          sample.pins[14].user,
          sample.pins[14].genre,
          sample.pins[14].savedBy,
          callback
        ); // 14
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
async.series([createGenres, createUsers, createPins], (err, results) => {
  if (err) {
    console.log('Error: ' + err);
  }
  console.log('-----------------------------');
  console.log('Successfully wrote seed data!');
  console.log('-----------------------------');
  // All done, disconnect from database
  mongoose.connection.close();
});
