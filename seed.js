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

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Arrays
 *****************************************/
let users = [];
let pins = [];

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
const pinCreate = (imageUrl, description, user, savedBy, cb) => {
  pindetail = {
    imageUrl: imageUrl,
    description: description,
    user: users[Math.floor(Math.random() * users.length)],
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
    savedBy: ['29063', '9187065']
  },
  {
    imageUrl: 'https://i.ibb.co/Jx3QwHb/e3E5zsh.jpg',
    description: 'Sliding barn door interior',
    user: users[1],
    savedBy: ['9187065']
  },
  {
    imageUrl: 'https://i.ibb.co/SsHL3mx/nwlJ8Xv.jpg',
    description: 'Futuristic Japanese apartment',
    user: users[1],
    savedBy: ['9187065']
  },
  {
    imageUrl: 'https://i.ibb.co/VpmxZ5B/pnP5IYH.jpg',
    description: 'Cool looking Iranian mosque interior',
    user: users[1],
    savedBy: ['9187065']
  },
  {
    imageUrl: 'https://i.ibb.co/9HR6G90/R6Gp7Gr.jpg',
    description: 'Unique wooden stairwell',
    user: users[0],
    savedBy: ['29063']
  },
  {
    imageUrl: 'https://i.ibb.co/StyHCmN/ri7rxeD.jpg',
    description: 'Nature is awesome!',
    user: users[2],
    savedBy: []
  },
  {
    imageUrl: 'https://i.ibb.co/6nYzhsv/SHaiZ3m.jpg',
    description: 'Weird toilet',
    user: users[0],
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

/* Async:: create pins:
 *****************************************/
const createPins = cb => {
  async.series(
    [
      callback => {
        console.log(seedPins[1]);
        pinCreate(
          seedPins[0].imageUrl,
          seedPins[0].description,
          seedPins[0].user,
          seedPins[0].savedBy,
          callback
        ); // 0
      },
      callback => {
        pinCreate(
          seedPins[1].imageUrl,
          seedPins[1].description,
          seedPins[1].user,
          seedPins[1].savedBy,
          callback
        ); // 1
      },
      callback => {
        pinCreate(
          seedPins[2].imageUrl,
          seedPins[2].description,
          seedPins[2].user,
          seedPins[2].savedBy,
          callback
        ); // 2
      },
      callback => {
        pinCreate(
          seedPins[3].imageUrl,
          seedPins[3].description,
          seedPins[3].user,
          seedPins[3].savedBy,
          callback
        ); // 3
      },
      callback => {
        pinCreate(
          seedPins[4].imageUrl,
          seedPins[4].description,
          seedPins[4].user,
          seedPins[4].savedBy,
          callback
        ); // 4
      },
      callback => {
        pinCreate(
          seedPins[5].imageUrl,
          seedPins[5].description,
          seedPins[5].user,
          seedPins[5].savedBy,
          callback
        ); // 5
      },
      callback => {
        pinCreate(
          seedPins[6].imageUrl,
          seedPins[6].description,
          seedPins[6].user,
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
};

dropCollections();

/* Init::: Async series
 *****************************************/
async.series(
  [createUsers, createPins],
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
