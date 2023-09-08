const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  const { method, originalUrl } = req;
  const timestamp = Date.now();
  console.log(`${method} ${originalUrl} ${timestamp}`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    req.name = name.trim();
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text || !text.trim()) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    req.text = text.trim();
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
