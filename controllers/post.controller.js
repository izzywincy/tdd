const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    // Extract post ID from request parameters
    const postId = req.params.id;

    // Extract updated post data from request body
    const updatedData = req.body;

    // Call the updatePost method from the PostModel
    PostModel.updatePost(postId, updatedData, (err, updatedPost) => {
        if (err) {
            // If an error occurs, send a 500 status code and the error message
            return res.status(500).json({ error: err.message });
        }
        // If the update is successful, send the updated post object in the response
        res.json(updatedPost);
    });
};

PostController.findPost = (req, res) => {
    return PostModel.findPost(req.body, (req,res) => {
        if (err) {
            res.status(err.status).end();
            return res.status(err.status).end();
        } else {
            return res.json(post);
        }
    })
    
};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;
