const User = require("../models/user");
const Log = require("../models/log");

const checkUsername = (req, res, next) => {
  if (!req.body.username) {
    return res.json({
      status: 400,
      msg: 'The username is needed',
      data: {}
    });
  }

  next();
};

const checkId = async (req, res, next) => {
  try {
    if (!req.params._id) {
      throw Error;
    }

    const user = await User.findById(req.params._id);

    if (!user) {
      throw Error;
    }

    next();
  } catch {
    return res.json({ err: "Not found" });
  }
};

const checkDescription = (req, res, next) => {
  const description = req.body.description;
  if (!description) {
    return res.json({ err: "Description is needed" })
  };

  next();
};

const checkDuration = (req, res, next) => {
  const duration = parseInt(req.body.duration);

  if (!duration) {
    return res.json({ err: "Duration must be a number" })
  };
  next();
};

const checkDate = (req, res, next) => {
  const date = req.body.date;

  if (!date) {
    return next();
  }

  if (!Date.parse(date)) {
    return res.json({ err: "Invalid date" });
  }

  next();
};

const checkLogId = async (req, res, next) => {
  try {
    if (!req.params._id) throw Error;
    const userLog = await Log.findById(req.params._id);

    if (!userLog) return res.json({ err: "User without log." });

    next();
  } catch {
    return res.json({ err: "ID is required /api/users/id/logs" });
  }

};

const checkUrlQuery = (req, res, next) => {
  const { from, to, limit } = req.query;

  if (from && !Date.parse(from)) {
    return res.json({ err: "From date must be a valid date" });
  }

  if (to && !Date.parse(to)) {
    return res.json({ err: "To date must be a valid date" });
  }

  if (limit && /[^0-9]/.test(limit)) {
    return res.json({ err: "Limit must be an integer number" });
  }

  next();
};

module.exports = {
  checkUsername,
  checkId,
  checkDescription,
  checkDuration,
  checkDate,
  checkLogId,
  checkUrlQuery
};