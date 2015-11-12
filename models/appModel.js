var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
	'requestId' : String,
	'date' : String,
	'startTime' : String,
	'endTime' : String,
	'borrowerName' : String,
	'approved' : double
});

var carSchema = mongoose.Schema({
	'carId' : String,
	'make' : String,
	'model' : String,
	'licensePlate' : String,
	'parkedLocation' : String,
	'keysLocation' : String,
	'isAutomatic' : Boolean,
	'moneyPolicy' : String,
	'owner' : String,
	'approvedList' : [String],
	'requests' : [String]
});

// var personSchema = mongoose.Schema({
// 	'userId' : String,
// 	'carId' : String
// });

module.exports = {
	'CarModel' : mongoose.model('CarModel', carSchema),
	'RequestModel' : mongoose.model('RequestModel', requestSchema)
};