/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//var mongoose = require('mongoose');

var Activity = require('../models/activity');

exports.findById = function(req, res){
  Activity.findById(req.params.activity_id, function(err, activity) {
            if (err)
                res.send(err);
            res.json(activity);
        });
};

exports.findAll = function(req, res) {
        
        var param = req.query.name;
        
        if(param){
            
            Activity.find({name : param}, function(err, activities) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(activities); // return all activities in JSON format
            });
            
        }else{

            // use mongoose to get all activities in the database
            Activity.find(function(err, activities) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(activities); // return all activities in JSON format
            });
    }
    };



