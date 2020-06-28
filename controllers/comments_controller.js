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

            if(request.xhr){
                //Similar for comments to fetch the user's id
                comment = await comment.populate('user', 'name').execPopulate();

                return response.status(200).json({
                    data: {
                        comment: comment
                    }, message: "Post created!"
                });
            }

            request.flash('success', 'Comment published!');
            response.redirect('/');
        }
    } catch(err) {
        console.log('Error', err);
        request.flash('error', err);
        return;
    }
}

module.exports.destroy = async function(request, response){
    try {
        
        let comment = await Comment.findById(request.params.id);
    
        let postId = comment.post;
        
        //Deletion of comment by Comment's Owner
        if(comment.user == request.user.id){
            
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: request.params.id}});

            //send the comment id which was deleted back to the views
            if(request.xhr){
                return response.status(200).json({
                    data: {
                        comment_id: request.params.id
                    },
                    message: "Comment deleted"
                });
            }

            request.flash('success', 'Comment deleted!');
            return response.redirect('back');
        }  else {

            //Deletion of comment by Post's Owner (Might need rectification)
            let post = await Post.findById(postId);
            if(post.user == request.user.id){
            
                // let postId = comment.post;    
                comment.remove();
    
                let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: request.params.id}});
                //send the comment id which was deleted back to the views
                if(request.xhr){
                    return response.status(200).json({
                        data: {
                            comment_id: request.params.id
                        },
                        message: "Comment deleted"
                    });
                }

                request.flash('success', 'Comment deleted!');
                return response.redirect('back');
            }
            else {
                request.flash('error', 'Unauthorised');
                return response.redirect('back');
            }             
        }    

    } catch (err) {
        console.log('Error', err);
        request.flash('error', err);
        return;
    }    
}



// FROM TASK SOLUTION CODE
// const Comment = require('../models/comment');
// const Post = require('../models/post');

// module.exports.create = async function(req, res){

//     try{
//         let post = await Post.findById(req.body.post);

//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });

//             post.comments.push(comment);
//             post.save();

//             if (req.xhr){
//                 // Similar for comments to fetch the user's id!
//                 comment = await comment.populate('user', 'name').execPopulate();
    
//                 return res.status(200).json({
//                     data: {
//                         comment: comment
//                     },
//                     message: "Post created!"
//                 });
//             }


//             req.flash('success', 'Comment published!');

//             res.redirect('/');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// }


// module.exports.destroy = async function(req, res){

//     try{
//         let comment = await Comment.findById(req.params.id);

//         if (comment.user == req.user.id){

//             let postId = comment.post;

//             comment.remove();

//             let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

//             // send the comment id which was deleted back to the views
//             if (req.xhr){
//                 return res.status(200).json({
//                     data: {
//                         comment_id: req.params.id
//                     },
//                     message: "Post deleted"
//                 });
//             }


//             req.flash('success', 'Comment deleted!');

//             return res.redirect('back');
//         }else{
//             req.flash('error', 'Unauthorized');
//             return res.redirect('back');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// }