/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var mongoose = require('mongoose');

  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

var Activity = require('../models/activity');


var LogSchema = new Schema({
    date : Date,
    duration : Number,
    activity  : { type: ObjectId, ref: 'Activity' }
});

module.exports = mongoose.model('Log', LogSchema);

