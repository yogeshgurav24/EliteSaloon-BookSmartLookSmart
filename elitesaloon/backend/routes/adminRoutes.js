const express = require('express');
const routes  = express.Router();
const AdminController = require("../controllers/AdminController/AdminController");

routes.post('/approve/:ownerId', AdminController.approveOwner );
routes.get('/owner-request', AdminController.ownerRequest);

module.exports = routes ;