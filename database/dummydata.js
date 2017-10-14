const db = require('./index.js');
const dbQuery = require('../controller/index.js');
const request = require('request');
const dbQueueMenu = require('../controller/queue_menu.js');

const addToQueue = () => {
  return dbQuery.addToQueue({name: 'Tiffany', restaurantId: 1, size: 2, mobile: '4158475697'})
    .then(() => dbQuery.addToQueue({name: 'Neha', restaurantId: 1, size: 3, mobile: '4158965693', email: 'nez@gmail.com'}))
    .then(() => dbQuery.addToQueue({name: 'Eugene', restaurantId: 2, size: 3, mobile: '4157855678', email: 'eugene@gmail.com'}))
    .then(() => dbQuery.addToQueue({name: 'Johnny', restaurantId: 2, size: 2, mobile: '4156844758'}))
    .catch(err => {
      console.log('error adding dummy data to queue', err);
    });
};

const addRestaurants = (cb) => {
  return addRestaurant('San Francisco', 'Tempest', () => {
    addRestaurant('San Francisco', 'House of Prime Rib', () => {
      addRestaurant('San Francisco', 'Tsunami Panhandle', () => {
        addRestaurant('San Francisco', 'Kitchen Story', () => {
          addRestaurant('San Francisco', 'Burma Superstar', () => {
            addRestaurant('San Francisco', 'State Bird Provisions', () => {
              addRestaurant('San Francisco', 'Limon Rotisserie', () => {
                addRestaurant('San Francisco', 'Nopa', () => {
                  addRestaurant('San Francisco', 'Farmhouse Kitchen', () => {
                    cb();
                  })
                })
              })
            })
          })
        })
      })
    })
  })
};

const addOrders = () => {
  return dbQueueMenu.addMenuForQueue(1, 2)
    .then(() => dbQueueMenu.addMenuForQueue(2, 1))
    .catch(err => {
      console.log('error adding dummy data to orders')
    });
}

const addRestaurant = (location, term, cb) => {
  options = {
    url: 'http://localhost:1337/yelp',
    qs: {
      location: location,
      term: term
    }
  };
  request.get(options, (error, response, body) => {
    if (error) {
      console.error('error adding ' + term + ': ', error);
    } else {
      console.log('added ' + term + ' to database');
      cb();
    }
  });
}

const addMenus = () => {
  return db.Menu.findOrCreate({where: {dish: 'Sandwich', description: 'Two pieces of bread with some stuff in between them.', price: 12, order: -3, restaurantId: 1}})
    .then(() => db.Menu.findOrCreate({where: {dish: 'Cake', description: 'A sweet spongey thing with frosting everywhere.', price: 9, order: -2, restaurantId: 2}}))
    .then(() => db.Menu.findOrCreate({where: {dish: 'Potato', description: 'A vegetable that when raw tastes like dirt and when fried tastes pretty good.', price: 100, order: -1, restaurantId: 1}}))
    .catch(err => {
      console.log('error adding dummy menus', err);
    });
};

const addManager = () => {
  db.Manager.findOrCreate({
    where: {
      username: 'johnny',
      passwordHash: 'a48af21cebc18c880a2b9c53dd8b3fab483e26ff2b7b77dd9def2afe8305ff44b17f1b8d58e6106bb49570e602fde2b960e0e420d53874b2d8626016bbd97f83',
      passwordSalt: '8b1269b13d1258b15af6c66f4f4d5cd9',
      restaurantId: 1
    }
  })
    .then(() => {
      return db.Manager.findOrCreate({
        where: {
          username: 'shane',
          passwordHash: '71876a5030fa96e9b0b1adbcc2579d03c2817dabd835ed6e64caf77b5bb31db63e51f65b368f9ba0d4156674a6217fca6a5a3cda9973fb7e47d0aaf979f6efd1',
          passwordSalt: 'dccfe760d41b6dcbb70ccd884c8df76b',
          restaurantId: null
        }
      });
    });
};

const addAnnouncements = () => {
  return db.Announcement.findOrCreate({where: {message: '50% off everything.', status: 'active', restaurantId: 1}})
      .then(() => db.Announcement.findOrCreate({where: {message: 'Check out our new subprime ribs. It\'s like 2008 all over again', status: 'active', restaurantId: 2}}))
      .catch(err => console.log('error adding dummy announcements', err));
};

const addCustomer = () => {
  return db.Customer.findOrCreate({
    where: {
      name: 'Shane Laymance',
      mobile: '(661) 703-2338',
      email: 'shane@gmail.com',
      managerId: 2
    }
  });
};

const rewardQueueOptions = {
  size: 2,
  status: 'Seated',
  customerId: 5
};

const addRewardQueues = () => {
  db.Queue.create(rewardQueueOptions)
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create(rewardQueueOptions))
    .then(() => db.Queue.create({
      size: 2,
      status: 'No Show',
      customerId: 5
    }));
};


const dropDB = () => {
  return db.Queue.drop()
    .then(() => db.Reward.drop())
    .then(() => db.Customer.drop())
    .then(() => db.Announcement.drop())
    .then(() => db.Menu.drop())
    .then(() => db.ManagerAudit.drop())
    .then(() => db.Manager.drop())
    .then(() => db.Restaurant.drop())
    .then(() => db.Restaurant.sync({force: true}))
    .then(() => addRestaurants(() => {
      db.Manager.sync({force: true})
      .then(() => addManager())
      .then(() => db.ManagerAudit.sync({force: true}))
      .then(() => db.Customer.sync({force: true}))
      .then(() => db.Menu.sync({force:true}))
      .then(() => db.Queue.sync({force: true}))
      .then(() => addToQueue())
      .then(() => db.QueueMenu.sync({force: true}))
      .then(() => addOrders())
      .then(() => db.Announcement.sync({force: true}))
      .then(() => addAnnouncements())
      .then(() => addMenus())
      .then(() => addCustomer())
      .then(() => addRewardQueues())
      .then(() => db.Reward.sync({force: true}))
      .catch(err => {
        console.log('error syncing dummy data', err);
      })
    }))
    .catch(err => {
      console.log('error syncing dummy data', err);
    });
};

module.exports = {
  addRestaurants,
  addToQueue,
  addManager,
  dropDB
};
