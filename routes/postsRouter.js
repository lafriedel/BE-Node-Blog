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
});

// POST to /api/posts
router.post('/', async (req, res) => {
    try {
        const { text, user_id } = req.body;
        if (!text || !user_id) {
            res.status(400).json({error: "You must submit both text and a valid user id." });
        } else {
            const newPost = await Posts.insert(req.body);
            res.status(201).json({newPost});
        }
    } catch {
        res.status(500).json({ error: "There was an error submitting the new post." });
    }
});

// PUT to /api/posts/:id
router.put('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const { text } = req.body;

        if (!text) {
            res.status(400).json({error: "You must submit both text and a valid user id."})
        } else {
            const post = await Posts.getById(id);
            if (post) {
                Posts.update(id, req.body)
                    .then(updated => {
                        if (updated === 1) {
                            Posts.getById(id)
                            .then(post => {
                                res.status(200).json(post);
                            })
                        } else {
                            res.status(500).json({error: "There was an error updating the post."})
                        }
                    })
                    .catch(err => {
                        res.status(500).json({error: "There was an error updating the post."})
                    });
            } else {
                res.status(404).json({error: "The post with the specified ID does not exist."})
            }
        }
    } catch {
        res.status(500).json({error: "There was an error updating the post."})
    }
})

// DELETE to /api/posts/:id
router.delete('/:id', (req, res) => {
    
})

module.exports = router;