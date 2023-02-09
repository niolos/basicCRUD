const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

let crudUser = new Schema({fName:{type:String}, lName:{type:String}, alias:{type:String}, email:{type:String}, tele:{type:Number}, dob:{type:String} })

module.exports = mongoose.model('crudUser', crudUser)