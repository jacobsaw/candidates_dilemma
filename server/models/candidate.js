var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
	name:String,
	voters:Number,
	debates:[]
})

var Candidate = mongoose.model('Candidate', CandidateSchema);