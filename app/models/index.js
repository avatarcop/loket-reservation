const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.location = require("./location.model.js")(mongoose);
db.event = require("./event.model.js")(mongoose);
db.tickettype = require("./tickettype.model.js")(mongoose);
db.transaction = require("./transaction.model.js")(mongoose);

module.exports = db;
