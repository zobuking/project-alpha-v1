/**
* Module dependencies.
*/
const multer = require('multer');
const ejs = require('ejs'); 
var bodyparser=require('body-parser');
var BP="req.body";
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path'),
	busboy = require("then-busboy"),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql      = require('mysql'),
	bodyParser=require("body-parser");
	
	
	
	app.set('view engine', 'ejs');
		
	urlencodedParser=bodyparser.urlencoded({extended : false});

	app.use(express.urlencoded({extended:false}));
	
	
	


	const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
	});


const upload = multer({storage: storage});

 



var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'Abu',
	password : '1234',
	database : 'employee'
});

connection.connect();

global.db = connection;

// all environments




app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


//app.use(fileUpload());

// development only

app.get('/',function(req,res){
	
	res.render('HOMEPG.ejs');	
	
});

app.get('/loginiadmin/:user1',function(req,res){
	var ret =req.params.user1;
	res.render('logini.ejs',{T:ret});	
	
});

app.post('/loginadmin/:user1',urlencodedParser,function(req,res){
	var ret =req.params.user1;
	var PG  ='SQL.ejs';
	var tablename="`users_image`";//Faculty
	if(ret=='0')
	{tablename="`users_image2`"
	 PG='ADMINPG1.ejs';
	 //console.log("yooo");

	}//Admin
	else if(ret=='2')
	{
	tablename="`users_image1`"//Student
	PG  ='SQL1.ejs'
	}
   	opera(PG,"select * from "+tablename+"where user_name=\""+req.body.id+"\" AND password =\""+req.body.password+"\"",res);
	
})





app.post('/upload',upload.array('myImage',5),routes.upload_material);
app.get('/STUDENT/:info', routes.index);//call for main index page
app.post('/STUDENT/:info',upload.single('myImage'), routes.index);//call for signup post
app.get('/:info/profile/:id',routes.profile);//to render users profile

app.get('/FACULTY/:info', routes.index);//call for main index page
app.post('/FACULTY/:info',upload.single('myImage'), routes.index);//call for signup post
app.get('/:info/profile/:id',routes.profile);//to render users profile
//Middleware
app.use('/assets',express.static('assets'));




function opera(pg,Q,res)
{
		connection.query(Q,function(error,response,body){
		if(!error)
		{console.log(response);
		
		res.render(pg,{data:response});	
		}
		
		else
		{res.send("ERROR");
		console.log(error);
		}
			
	});

}

 





 
 

 










const port = 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
