const Post = require('../models/post');

module.exports.home = function(request, response){
    // return response.end('<h1>Express is up for Codeial!</h1>');
   // console.log(request.cookies);
   //res.cookie('user_id', 25);
//    Post.find({}, function(err, posts){
//     return response.render('home', {
//         title: "Codeial | Home",
//         posts: posts
//     });
//    });    

    Post.find({}).populate('user').exec(function(err, posts){
        return response.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
       });
}

// module.exports.actionName = function(request, response){}