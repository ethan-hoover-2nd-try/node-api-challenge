const express = require('express');
const Actions = require('../../data/helpers/actionModel');
const validateActionId = require('../middleware/validateActionId');
const validateProjectId = require('../middleware/validateProjectId');

const router = express.Router();

module.exports = router;