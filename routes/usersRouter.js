const express = require("express");

const Users = require("../data/helpers/userDb");

const router = express.Router();

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
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Please enter a name." });
    } else {
      const newUser = await Users.insert(req.body);
      res.status(201).json({ newUser });
    }
  } catch {
    res
      .status(500)
      .json({
        error: "There was an error adding the new user to the database."
      });
  }
});

// PUT to /api/users/:id
router.put("/:id", async (req, res) => {
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
router.delete("/:id", (req, res) => {});

module.exports = router;
