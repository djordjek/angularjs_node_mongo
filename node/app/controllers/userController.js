/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var mongoose = require('mongoose');

var User = require('../models/user');

exports.findAll = function(req, res) {
        
            // use mongoose to get all activities in the database
            User.find(function(err, users) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(users); // return all activities in JSON format
            });
    
    };


