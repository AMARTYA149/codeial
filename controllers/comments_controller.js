const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(request, response){
    try{
        let post = await Post.findById(request.body.post);
        if (post){
            let comment = await Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            });

            post.comments.push(comment);
            post.save();

            response.redirect('/');
        }
    } catch(err) {
        console.log('Error', err);
        return;
    }
}

module.exports.destroy = function(request, response){
    Comment.findById(request.params.id, function(err, comment){
        let postId = comment.post;
        
        //Deletion of comment by Comment's Owner
        if(comment.user == request.user.id){
            
            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: request.params.id}}, function(err, post){
                return response.redirect('back');
            })
        }  else {

            //Deletion of comment by Post's Owner (Might need rectification)
            Post.findById(postId, function(err, post){
                if(post.user == request.user.id){
            
                    // let postId = comment.post;
        
                    comment.remove();
        
                    Post.findByIdAndUpdate(postId, { $pull: {comments: request.params.id}}, function(err, post){
                        return response.redirect('back');
                    });
                }
                else {
                    return response.redirect('back');
                } 
            });

            
        }
    })
}