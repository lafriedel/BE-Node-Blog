const express = require('express');

const Users = require('../data/helpers/userDb');

const router = express.Router();

// GET to /api/users
router.get('/', async (req, res) => {
    try {
        const users = await Users.get();
        res.status(200).json(users);
    } catch {
        res.status(500).json({ error: "There was an error retrieving the information." });
    }
})

// GET to /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.getById(id);
        if (user) {
            res.status(200).json({user});
        } else {
            res.status(404).json({error: "A post with the requested ID does not exist." });
        }
    } catch {
        res.status(500).json({error: "There was an error retrieving the post." });
    }
})

// POST to /api/users
router.post('/', (req, res) => {
    
})

// PUT to /api/users/:id
router.put('/:id', (req, res) => {
    
})

// DELETE to /api/users/:id
router.delete('/:id', (req, res) => {
    
})

module.exports = router;