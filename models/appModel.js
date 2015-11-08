var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
	'date' : String,
	'startTime' : String,
	'endTime' : String,
	'borrowerName' : String
});

var carSchema = mongoose.Schema({
	'make' : String,
	'model' : String,
	'licensePlate' : String,
	'parkedLocation' : String,
	'keysLocation' : String,
	'isAutomatic' : Boolean,
	'moneyPolicy' : String,
	'owner' : String,
	'approvedList' : [String],
	'pendingRequests' : [requestSchema],
	'scheduledRequests' : [requestSchema]
});

module.exports = {
	'CarModel' : mongoose.model('CarModel', carSchema),
	'RequestModel' : mongoose.model('RequestModel', requestSchema)
};