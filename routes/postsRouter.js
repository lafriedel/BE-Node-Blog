const express = require('express');

const Posts = require('../data/helpers/postDb');

const router = express.Router();

// GET to /api/posts
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get();
        res.status(200).json(posts);
    } catch {
        res.status(500).json({ error: "There was an error retrieving the information."});
    }
})

// GET to /api/posts/:id
router.get('/:id', (req, res) => {

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