module.exports = app => {
  const location = require("../controllers/location.controller.js");
  const event = require("../controllers/event.controller.js");
  const tickettype = require("../controllers/tickettype.controller.js");
  const transaction = require("../controllers/transaction.controller.js");

  var router = require("express").Router();

  // LOCATION
  router.get("/location", location.findAll);
  router.post("/location/create", location.create);
  router.get("/location/:id", location.findOne);

  // EVENT
  router.get("/event/get_info", event.findAll);
  router.post("/event/create", event.create);
  router.get("/event/:id", event.findOne);

  // TICKET TYPE
  router.get("/ticket", tickettype.findAll);
  router.post("/ticket/create", tickettype.create);
  router.get("/ticket/:id", tickettype.findOne);

  // TRANSACTION
  router.get("/transaction/get_info", transaction.findAll);
  router.post("/transaction/purchase", transaction.create);
  router.get("/transaction/:id", transaction.findOne);

  app.use('/api/v1/', router);
};
