var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidate');
function CandidatesController() {
    // fetch all candidates
    this.index = function(req, res) {
        Candidate.find({}, function(err, candidates) {
            if (err) {
                console.log(`Error: ${err}`);
                res.json(err);
            } else {
                res.json(candidates);
            }
        });
    }
}
module.exports = new CandidatesController();
