//  IMPORTS
const express = require("express");
const router = express.Router();

//  MIDDLEWARES
const {
  checkUsername,
  checkId,
  checkDescription,
  checkDuration,
  checkDate,
  checkLogId,
  checkUrlQuery
} = require("../middlewares/middlewares");

//  CONTROLLERS
const {
  getIndex,
  postUser,
  getUsers,
  postExercise,
  getExercise,
  getLogs
} = require("../controllers/controllers");

//  API - GET
router.get('/', getIndex);
router.get('/api/users', getUsers);
router.get('/api/users/:_id/exercises', getExercise);
router.get('/api/users/:_id/logs',
  [
    checkLogId,
    checkUrlQuery
  ],
  getLogs);

//  API - POST
router.post('/api/users', checkUsername, postUser);
router.post('/api/users/:_id/exercises',
  [
    checkId,
    checkDescription,
    checkDuration,
    checkDate
  ],
  postExercise);

module.exports = router;