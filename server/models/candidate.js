var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Candidate({
	name:String,
	voters:Number,
	debates:[]
})

var Candidate = mongoose.model('Candidate', CandidateSchema);