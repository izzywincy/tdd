const PostModel = require('./moduleA.model');
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
    const postId = req.params.id;
    const updatedData = req.body;
    PostModel.updatePost(postId, updatedData, (err, updatedPost) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(updatedPost);
    });
};

PostController.findPost = (req, res) => {
    return PostModel.findPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end(); // Handle the error appropriately
        }
        return res.json(post);
    });
};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;
