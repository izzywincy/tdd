const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

exports.findPost = (obj, next) => {

    try {
        const post = Post.findById(obj._id)
        if(!post) {
            return next(new Error("No posts found"), {status: 404, error: "no post found"})
        }
    } catch {
        return next(new Error("Something went wrong!"), { status: 500, error: "server error" });
    }
    return next(null,post)
}

exports.updatePost = (id, updatedFields, next) => {
    Post.findByIdAndUpdate(id, updatedFields, { new: true }, (err, updatedPost) => {
        if (err) {
            return next(err, null);
        }
        if (!updatedPost) {
            return next(new Error("Post not found"), null);
        }
        next(null, updatedPost);
    })
};
