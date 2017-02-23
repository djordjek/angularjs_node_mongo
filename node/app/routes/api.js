/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Activity = require('../models/activity');

var Log = require('../models/log');
var Story = require('../models/story');

var User = require('../models/user');

var config = require ('../../config');

var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
    
    var token = jsonwebtoken.sign({
        id : user._id,
        name : user.name,
        username : user.username
        
    }, secretKey, {
        expirtesMinute : 1440
    });
    
    return token;
    
}

var probaActivity = require('../controllers/activityController');

var userController = require('../controllers/userController');

var dateFormat = require('dateformat');

var moment = require('moment');


module.exports = function (app, express){
    
    var api = express.Router();
    
    api.post('/signup', function (req, res){
        
        var user = new User({
            name : req.body.name,
            username : req.body.username,
            password : req.body.password
        });
        
        user.save(function (err){
            if(err){
                res.send(err);
                return;
            }
            
            res.json({message : 'User has been created'});
        });
        
    });
    
    api.post('/api/login', function (req, res){
       
       User.findOne({
           username : req.body.username
       }).select('password').exec(function (err, user){
           if(err) throw err;
           
           if(!user){
               res.send({message : 'User does not exist'});
           }else{
               var validPassword = user.comparePassword(req.body.password);
               if(!validPassword){
                   res.send({message : "Invalid Password"});
               }else{
                   ////// token
                   var token = createToken(user);
                   
                   res.json({
                       success : true,
                       message : "Successfully login",
                       token : token
                   });
               }
            }
       });
        
    });
    
    /*api.use(function (req,res, next){
        console.log("Somebody just came to our app");
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        
        //check if token exist
        if(token){
            jsonwebtoken.verify(token, secretKey, function (err, decoded){
                if(err){
                    res.status(403).send({success : false, message : "Failed to authenticate user"});
                }else{
                    
                    req.decoded = decoded;
                    
                    next();
                }
            });
        }else{
            res.status(403).send({success : false, message : "No token provided"});
        }
    });*/
    
   /* api.get('/hi', function (req, res){
        res.json('Hello World');
    });*/
    
    api.route('/hi')
            .post(function (req, res){
                
                var story = new Story({
                   creator : req.decoded.id,
                   content : req.body.content
                });
                
                story.save(function (err){
                    if(err){
                        res.send(err);
                        return;
                    }
                    res.json({message : "New story created"});
                });
    });
    
    api.get('/api/me', function (req, res){
        res.json(req.decoded);
    });
    
    api.get('/api/activities', probaActivity.findAll);
    
    api.get('/api/users', userController.findAll);
    
    
    api.get('/api/logs', function(req, res) {
        
        /*Log.find({ }).where('duration').equals(67).exec(function(err, logs) {
            if (err) throw err;

                // show the admins in the past month
                res.json(logs);
        });*/

        // use mongoose to get all logs in the database
        Log.find(function(err, logs) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(logs); // return all logs in JSON format
        });
    });
    
    api.post('/api/logs', function(req, res) {
        
        //var data = new ISODate();
        
        //var day = dateFormat(data, "yyyy-mm-dd h:MM:ss");
        
        var day = moment().format();

        // create a log, information comes from AJAX request from Angular
        Log.create({
            duration : req.body.duration,
            date : day,
            //date : req.body.date,
            activity : req.body.activity,
            done : false
        }, function(err, log) {
            if (err)
                res.send(err);

            // get and return all the logs after you create another
           Log.find(function(err, logs) {
                if (err)
                    res.send(err);
                res.json(logs);
            });
        });

    });
	
	// create activity and send back all activities after creation
    api.post('/api/activities', function(req, res) {

        // create a activity, information comes from AJAX request from Angular
        Activity.create({
            name : req.body.name,
            done : false
        }, function(err, activity) {
            if (err)
                res.send(err);

            // get and return all the activities after you create another
           Activity.find(function(err, activities) {
                if (err)
                    res.send(err);
                res.json(activities);
            });
        });

    });
    
    // delete a activity
    api.delete('/api/activities/:activity_id', function(req, res) {
        Activity.remove({
            _id : req.params.activity_id
        }, function(err, activity) {
            if (err)
                res.send(err);

            // get and return all the activities after you create another
            Activity.find(function(err, activities) {
                if (err)
                    res.send(err);
                res.json(activities);
            });
        });
    });
    
    api.put('/api/activities/:activity_id', function(req, res) {

        // use our bear model to find the bear we want
        Activity.findById(req.params.activity_id, function(err, activity) {

            if (err)
                res.send(err);

            activity.name = req.body.name;  // update the bears info

            // save the bear
            activity.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Activity updated!' });
            });

        });
    });
    
    api.get('/api/activities/:activity_id', probaActivity.findById);
    
    return api;
    
};


