const express = require('express');

const Posts = require('../data/helpers/postDb');

const router = express.Router();

// GET to /api/posts
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get();
        res.status(200).json(posts);
    } catch {
        res.status(500).json({ error: "There was an error retrieving the posts."});
    }
})

// GET to /api/posts/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Posts.getById(id);
        if (post) {
            res.status(200).json({post});
        } else {
            res.status(404).json({error: "A post with the requested ID does not exist." });
        }
    } catch {
        res.status(500).json({error: "There was an error retrieving the post." });
    }
})

// POST to /api/posts
router.post('/', (req, res) => {
    
})

// PUT to /api/posts/:id
router.put('/:id', (req, res) => {
    
})

// DELETE to /api/posts/:id
router.delete('/:id', (req, res) => {
    
})

module.exports = router;