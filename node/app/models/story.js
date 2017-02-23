/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StorySchema = new Schema({
   
   creator: {type : Schema.Types.ObjectId, ref : 'User' },
   content : String,
   crated : {type : Date, default : Date.now}
    
});

module.exports = mongoose.model('Story', StorySchema);


