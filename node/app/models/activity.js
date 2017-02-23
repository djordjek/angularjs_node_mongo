/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ActivitySchema = new Schema({
   name : String
   // username : { type: String, required : true, index : {unique: true}},
   //password : {typr : String, required : true, select : false}
});



module.exports = mongoose.model('Activity', ActivitySchema);



