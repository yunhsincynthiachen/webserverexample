var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
	'requestId' : String,
	'date' : String,
	'startTime' : String,
	'endTime' : String,
	'borrowerName' : String,
	'approved' : {type: Number, min: 0, max: 2}
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
	'approvedList' : [mongoose.Schema.Types.Mixed],
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