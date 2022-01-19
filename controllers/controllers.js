//  IMPORTS
const path = require("path");
const User = require("../models/user.js");
const Log = require("../models/log.js");

//  FUNCTIONS
const getIndex = (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../views')
  });
};

const postUser = (req, res) => {
  const user = new User({ username: req.body.username });

  user.save((err, data) => {
    if (err) return res.json({ err: 'Error at saving username' });
    res.json({ username: data.username, _id: data._id });
  });
};

const getUsers = (req, res) => {
  User.find({}, (err, data) => {

    if (err) {
      return res.json({
        err: "A Snorlax blocked the request. Please try again."
      });
    }

    const users = data.map(({ username, _id }) => ({
      username, _id
    }));

    res.json(users);
  });
};

const getExercise = (req, res) => {
  res.json({ err: "You shouldn't be here" });
};

const postExercise = async (req, res) => {
  const { description, duration } = req.body;
  const { _id, username } = await User.findById(req.params._id);

  const date = (!req.body.date)
    ? new Date().toDateString()
    : new Date(req.body.date).toDateString();

  const bodyLog = { description, duration: parseInt(duration), date };

  const existingLog = await Log.findById(_id);

  if (!existingLog) {
    const newLog = new Log({ username, count: 1, _id, log: bodyLog });
    await newLog.save();
  } else {
    existingLog.count += 1;
    existingLog.log.push(bodyLog);
    await existingLog.save();
  }

  res.json({
    username,
    description,
    duration: parseInt(duration),
    date,
    _id
  });
};

const getLogs = async (req, res) => {
  const { _id } = req.params;
  const { username, count, log } = await Log.findById(_id);

  let queryLog = log;

  const fromDate = Date.parse(req.query.from);
  const toDate = Date.parse(req.query.to);
  const limit = parseInt(req.query.limit);

  if (fromDate) {
    queryLog = queryLog.filter(q => Date.parse(q.date) >= fromDate);
  }

  if (toDate) {
    queryLog = queryLog.filter(q => Date.parse(q.date) <= toDate);
  }

  if (limit) {
    const logsToRemove = Math.abs(queryLog.length - limit);

    for (let i = 0; i < logsToRemove; i++) {
      queryLog.pop();
      if (queryLog.length == 0) break;
    }
  }

  res.json({ username, count, _id, log: queryLog });

};


module.exports = {
  getIndex,
  postUser,
  getUsers,
  postExercise,
  getExercise,
  getLogs
};