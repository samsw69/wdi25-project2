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
    firstName: 'Sam',
    lastName: 'Wakefield',
    username: 'samsw69',
    email: 'samsw69@icloud.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Event
      .create([{
        henName: 'Big Mo',
        activity: 'nude life drawing',
        date: '18.11.17',  //find out correct date format
        time: '11.00',  //find out correct time format
        image: 'https://cdn.maximise.co.uk/images/prods/80852-85-nude-life-drawing.jpg',
        address1: '123 High Street',
        address2: 'Brighton',
        postcode: 'HP10 9AY',
        comment: 'no zoom lense cameras allowed!!',
        createdBy: users[0]

      },{
        henName: 'Big Mo',
        activity: 'dinner at Chez Poulet',
        date: '18.11.17',  //find out correct date format
        time: '18.00',  //find out correct time format
        comment: 'elasticated waists - eat more then you should buffet!!',
        address1: '123 High Street',
        address2: 'Brighton',
        postcode: 'HP10 9AY',
        image: 'http://partykrakow.co.uk/wp-content/uploads/2014/11/hen-party-at-home.jpg',
        createdBy: users[0]
      },{
        henName: 'Big Mo',
        activity: 'Club Dazzle - ladies night!',
        date: '18.11.17',  //find out correct date format
        time: '21.00',  //find out correct time format
        comment: 'no cameras allowed!!',
        address1: '123 High Street',
        address2: 'Brighton',
        postcode: 'HP10 9AY',
        image: 'https://i.imgflip.com/paurx.jpg',
        createdBy: users[0]
      }]);
  })
  .then((events) => console.log(`${events.length} events created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
