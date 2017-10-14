const db = require('../database/index.js');
const { ne, lt, gt } = db.Sequelize.Op;

const addMenuForQueue = (queueId, menuId) => {
  return db.QueueMenu.findOrCreate({ where: { menuId: menuId, queueId: queueId } })
};

const getMenuForQueue = (queueId) => {
  return db.Menu.findAll({
    include: {
      model: db.Queue,
      where: { id: queueId}
    }
  })
}

const removeItems = (queueId, menuId) => {
  if (menuId) {
    return db.QueueMenu.destroy({
      where: { queueId: queueId, menuId: menuId }
    })
  } else {
    return db.QueueMenu.destroy({
      where: { queueId: queueId}
    })
  }
};

module.exports = {
  addMenuForQueue,
  removeItems,
  getMenuForQueue
};
