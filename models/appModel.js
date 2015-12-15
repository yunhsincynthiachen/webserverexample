var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
	'ownerId' : String,
	'requestId' : String,
	'date' : String,
	'startTime' : String,
	'endTime' : String,
	'borrowerName' : String,
	'borrowerId' : String,
	'optmessage' : String,
	'approved' : {type: Number, min: 0, max: 2}
});

var carSchema = mongoose.Schema({
	'facebook_id' : String,
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

var borrowerSchema = mongoose.Schema({
	'borrower_name' : String,
	'facebook_id' : String,
	'can_borrow' : [String],
	'requests' : [String]
});

//For borrower or owner: They will only have a carId if they are an owner
var personSchema = mongoose.Schema({
	'facebook_name' : String,
	'facebook_id' : String,
	'user_type' : String
});

module.exports = {
	'CarModel' : mongoose.model('CarModel', carSchema),
	'RequestModel' : mongoose.model('RequestModel', requestSchema),
	'PersonModel' : mongoose.model('PersonModel', personSchema),
	'BorrowerModel' : mongoose.model('BorrowerModel', borrowerSchema)
};
