const express = require("express");

const Users = require("../data/helpers/userDb");
const Posts = require("../data/helpers/postDb");

const router = express.Router();

function upperCaseCheck(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

// GET to /api/users
router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch {
    res
      .status(500)
      .json({ error: "There was an error retrieving the information." });
  }
});

// GET to /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.getById(id);
    if (user) {
      res.status(200).json({ user });
    } else {
      res
        .status(404)
        .json({ error: "A post with the requested ID does not exist." });
    }
  } catch {
    res.status(500).json({ error: "There was an error retrieving the post." });
  }
});

// POST to /api/users
router.post("/", upperCaseCheck, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Please enter a name." });
    } else {
      const newUser = await Users.insert(req.body);
      res.status(201).json({ newUser });
    }
  } catch {
    res.status(500).json({
      error: "There was an error adding the new user to the database."
    });
  }
});

// PUT to /api/users/:id
router.put("/:id", upperCaseCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "You must submit a name." });
    } else {
      const user = await Users.getById(id);
      if (user) {
        Users.update(id, req.body)
          .then(updated => {
            if (updated === 1) {
              Users.getById(id).then(user => {
                res.status(200).json(user);
              });
            } else {
              res
                .status(500)
                .json({ error: "There was an error updating the user." });
            }
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "There was an error updating the user." });
          });
      } else {
        res
          .status(404)
          .json({ error: "The user with the specified ID does not exist." });
      }
    }
  } catch {
    res.status(500).json({ error: "There was an error updating the user." });
  }
});

// DELETE to /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);

    if (user) {
      const userPosts = await Users.getUserPosts(user.id);

      for (let i = 0; i < userPosts.length; i++) {
        Posts.remove(userPosts[i].id).then(deleted => {
          if (deleted === 1) {
            res.status(204).end();
          } else {
            res.status(500).json({
              error:
                "There was an error deleting the posts of the specified user."
            });
          }
        });
      }

      await Users.remove(id).then(deleted => {
        if (deleted === 1) {
          res.status(204).end();
        }
      });
    } else {
      res
        .status(404)
        .json({ error: "The user with the specified ID does not exist." });
    }
  } catch {
    res.status(500).json({ error: "There was an error deleting the user." });
  }
});

// GET posts of user
router.get("/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);

    if (user) {
      await Users.getUserPosts(user.id).then(posts => {
        if (posts.length !== 0) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ error: "This user does not have any posts." });
        }
        // res.status(200).json(posts);
      });
    } else {
      res
        .status(404)
        .json({ error: "A user with the specified ID does not exist." });
    }
  } catch {
    res
      .status(500)
      .json({ error: "There was an error retrieving the user's posts." });
  }
});

module.exports = router;
