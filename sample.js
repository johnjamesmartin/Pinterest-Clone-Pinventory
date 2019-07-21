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
      accessLevel: 3
    },
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
      genre: 28,
      savedBy: []
    },
    {
      imageUrl: 'https://i.ibb.co/6nYzhsv/SHaiZ3m.jpg',
      description: 'Weird toilet',
      user: 0,
      genre: 20,
      savedBy: []
    }
  ]
};

module.exports = sample;
