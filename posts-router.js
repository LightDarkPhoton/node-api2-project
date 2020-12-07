const express = require("express");
const router = express.Router()
const Database = require("./data/db.js")

// GET Requests //

// Notice how you don't have to put "/api/posts". We do that in the router file.
// Assume "/api/posts" is being attached to all these
router.get("/", (req, res) => {
    Database.find(req.query)
    .then(posts => {
        res.status(200).json({query: req.query, data: posts});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {

    Database.findById(req.params.id)
    .then(post => {
        // If the posts exists...
        if (post) {
            res.status(200).json(post)
        } else {
            // If the post does not exist
            res.status(404).json( {message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        // If we couldn't even get any information back to begin with
        console.log(error)
        res.status(500).json( { error: "The post information could not be retrieved."})
    })
})

router.get('/:id/comments', (req, res) => {
    Database.findCommentById(req.params.id)
    .then(comments => {
        if (comments) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The post information could not be retrieved."})
    })
})

// POST Requests //

router.post('/', (req, res) => {
    Database.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

router.post('/:id/comments', (req, res) => {
    Database.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: "Please provide text for the comment." });
    })
})

// PUT Request //

router.put("/:id", (req, res) => {
    Database.update(req.params.id, req.body)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "Please provide title and contents for the post." })
    })
})

// Delete Request //

router.delete("/:id", (req, res) => {
    Database.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "Successfully delete post"});
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The post could not be removed" });
    });
});

module.exports = router;