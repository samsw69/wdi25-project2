const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Event = require('../models/event');
const User = require('../models/user');

Event.collection.drop();
User.collection.drop();

User
  .create([{
    firstName: 'Becky',
    lastName: 'Austin',
    username: 'Bexster',
    email: 'bexster@icloud.com',
    password: 'password',
    passwordConfirmation: 'password',
    profileImage: 'https://static.wixstatic.com/media/3a0aa5_d05123cc70cb47c28f5a12ff2ece6395.jpg',
    knowHen: 'She is a minion in my netball team',
    funnyStory: 'The Hen once climbed a pole at a festival to prove she could and was promptly chased down by Security, interrupting the show!'
  },{
    firstName: 'Emma',
    lastName: 'Lidbury',
    username: 'Lidders',
    email: 'lidders@icloud.com',
    password: 'password',
    passwordConfirmation: 'password',
    profileImage: 'https://i.ytimg.com/vi/4K_LAgnqqdE/maxresdefault.jpg',
    knowHen: 'I am her sister in Law',
    funnyStory: 'farts and blames the dog when she visits for Sunday Dinner and thinks we dont know its her!'
  },{
    firstName: 'Emma',
    lastName: 'Hester',
    username: 'Donde',
    email: 'donde@icloud.com',
    password: 'password',
    passwordConfirmation: 'password',
    profileImage: 'http://4.bp.blogspot.com/-O2g5sn5OAOg/VSz9VE8CSsI/AAAAAAAAAUg/MJwocjXhsyw/s1600/old-skool-selfie.jpg',
    knowHen: 'We work together at the biscuit factory',
    funnyStory: 'She once got arrested as the suspected head of a Romanian girl gang operating in Uxbridge'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Event
      .create([{
        henName: 'Big Mo',
        activity: 'Nude life drawing',
        date: '2017.11.18',
        time: '11:00',
        image: 'https://cdn.maximise.co.uk/images/prods/80852-85-nude-life-drawing.jpg',
        address1: '13 Bond St,',
        address2: 'Brighton',
        postcode: 'BN1 1RD',
        lat: '50.823517',
        lng: '-0.1405565',
        description: 'no cameras, no touching, no sampling allowed - please sharpen your pencils in advance!!',
        createdBy: users[0]
      },{
        henName: 'Big Mo',
        activity: 'Dinner at Chez Poulet',
        date: '2017.11.18',
        time: '19:30',
        description: 'elasticated waists - eat more then you should buffet - free bottle of wine between 2!!',
        address1: '21a Norfolk Square',
        address2: 'Brighton',
        postcode: 'BN1 2PD',
        lat: '50.8240312',
        lng: '-0.1554573',
        image: 'http://partykrakow.co.uk/wp-content/uploads/2014/11/hen-party-at-home.jpg',
        createdBy: users[0]
      },{
        henName: 'Big Mo',
        activity: 'Club Dazzle - ladies night!',
        date: '2017.11.18',
        time: '22:00',
        description: 'Meet outside restaurant for cabs at 21.45 - VIP list arranged - 1st drink free!!',
        address1: 'Kingswest, West St',
        address2: 'Brighton',
        postcode: 'BN1 2RE',
        lat: '50.8208197',
        lng: '-0.1461235',
        image: 'https://i.imgflip.com/paurx.jpg',
        createdBy: users[0]
      }]);
  })
  .then((events) => console.log(`${events.length} events created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
