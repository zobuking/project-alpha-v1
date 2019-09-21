/*
* GET home page.
*/
 /*
exports.index = function(req, res){	 
	var ret =req.params.info;
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;

	  if (!req.files)
				return res.status(400).send('No files were uploaded.');

		var file = req.files.myImage;
		var img_name=file.name;
		
		 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
			 var tablename="`users_image1`";
		 if(ret=='1'){console.log(ret);
					  tablename="`users_image`";
		 
										}
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)

	                return res.status(500).send(err);
      					var sql = "INSERT INTO "+tablename+"(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";

    						var query = db.query(sql, function(err, result) {
    							 res.redirect('/'+ret+'/profile/'+result.insertId);
    						});
					   });
          } else {
			
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            //res.render('index.ejs',{message: message,T:ret});
          }
   } else {
	     //message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render('index',{T:ret,message: message});
   }
 
};*/




exports.index = function(req, res){	 
	var ret =req.params.info;
    message = '';
   if(req.method == "POST"){
     var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
	 //res.send("jabermunna");
		
	 var fileinfo = req.file.filename;
	  var tablename="`users_image1`";
		 if(ret=='1'){console.log(ret);
		 tablename="`users_image`";}
			
		var sql = "INSERT INTO "+tablename+"(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + fileinfo + "')";

    						var query = db.query(sql, function(err, result) {
    							 res.redirect('/'+ret+'/profile/'+result.insertId);
    						});		
			
	 // var title  =req.files.filename;
	  //console.log("Session: %j",title);
      //res.send(fileinfo);		
		
            
   } else {
	     //message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render('index',{T:ret,message: message});
   }
 
};














exports.profile = function(req, res){
	var message = '';
	var id = req.params.id;
	var tablename="`users_image1`";
	var ret =req.params.info;
	if(ret==1){tablename="`users_image`";}
    var sql="SELECT * FROM "+tablename+" WHERE `id`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('profile.ejs',{data:result, message: message});
   });
};


exports.upload_material=function(req,res){
	  var fileinfo = req.files[0].filename;
	  var title  =req.files.filename;
	  //console.log("Session: %j",title);
      res.send(fileinfo);
}




