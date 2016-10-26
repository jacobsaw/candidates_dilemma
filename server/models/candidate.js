var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
	name: { type:String, required:true, minlength:3 },
	moderator: { type:Boolean, default:false },
	voters: { type:Number, default:0 },
	debates:[]
}, {timestamps: true});

var Candidate = mongoose.model('Candidate', CandidateSchema);
