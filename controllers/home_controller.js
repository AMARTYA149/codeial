module.exports.home = function(request, response){
    // return response.end('<h1>Express is up for Codeial!</h1>');
   // console.log(request.cookies);
    return response.render('home', {
        title: "Home"
    });
}

// module.exports.actionName = function(request, response){}