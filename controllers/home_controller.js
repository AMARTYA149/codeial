const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(request, response){
    // return response.end('<h1>Express is up for Codeial!</h1>');
   // console.log(request.cookies);
   //res.cookie('user_id', 25);
//    Post.find({}, function(err, posts){
//     return response.render('home', {
//         title: "Codeial | Home",
//         posts: posts
//     });
//    });    

//Populate the user of each post
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        });
    
        let users = await User.find({}); 
    
        return response.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }

   
}

// module.exports.actionName = function(request, response){}