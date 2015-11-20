# CarShareApp
This is the server for CarShareApp.

IP: 52.33.226.47

## Schemas
Here are the different schemas:

``` JavaScript

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

var personSchema = mongoose.Schema({
  'facebook_name' : String,
  'facebook_id' : String,
  'user_type' : String
});

```

## Routes

All routes return 500 for error.

These are the routes that we have so far:

### POST /person:
-  Adding a person to the server:

``` JavaScript

app.post('/person', function(req, res) {
  var b = req.body;

  var person = new PersonModel();
  person.facebook_name = b.facebook_name;
  person.facebook_id = b.facebook_id;
  person.user_type = b.user_type;

```

### GET /person:
- Getting all of the people in server information:

```JSON
[
  {
    'facebook_name' : facebook_name,
    'facebook_id' : facebook_id,
    'user_type' : user_type
  },
  {
    'facebook_name' : facebook_name,
    'facebook_id' : facebook_id,
    'user_type' : user_type
  },...
]
```

### GET /person/:facebook_id:
- Getting one user:

```JSON
{
  'facebook_name' : facebook_name,
  'facebook_id' : facebook_id,
  'user_type' : user_type
}
```

### POST /cars
-  Adding a car to the server:

``` JavaScript
app.post('/cars', function(req, res) {
  var b = req.body;

  var car = new CarModel();
  car.facebook_id = b.facebook_id;
  car.make = b.make;
  car.model = b.model;
  car.licensePlate = b.licensePlate;
  car.parkedLocation = b.parkedLocation;
  car.keysLocation = b.keysLocation;
  car.isAutomatic = b.isAutomatic;
  car.moneyPolicy = b.moneyPolicy;
  car.owner = b.owner;
  car.approvedList = [];
  car.requests = [];
```

### GET /cars/:facebook_id:

- Getting the car associated to the person:

This route takes parameters in the following form:

``` JSON
{
  'facebook_id' : facebook_id,
	'make' : make,
	'model' : model,
	'licensePlate' : licensePlate,
	'parkedLocation' : parkedLocation,
	'keysLocation' : StkeysLocationring,
	'isAutomatic' : isAutomatic,
	'moneyPolicy' : moneyPolicy,
	'owner' : owner,
	'approvedList' : 'approvedList',
	'requests' : 'requests'
}

```

This route returns and HTTP response code, 500 for error, or 200 for success.
### GET /cars
- Getting all of the cars in the server:

What we get out of it:

``` JSON
[
  {
    'facebook_id' : facebook_id,
  	'make' : make,
  	'model' : model,
  	'licensePlate' : licensePlate,
  	'parkedLocation' : parkedLocation,
  	'keysLocation' : StkeysLocationring,
  	'isAutomatic' : isAutomatic,
  	'moneyPolicy' : moneyPolicy,
  	'owner' : owner,
  	'approvedList' : 'approvedList',
  	'requests' : 'requests'
  },
  {
    'facebook_id' : facebook_id,
  	'make' : make,
  	'model' : model,
  	'licensePlate' : licensePlate,
  	'parkedLocation' : parkedLocation,
  	'keysLocation' : StkeysLocationring,
  	'isAutomatic' : isAutomatic,
  	'moneyPolicy' : moneyPolicy,
  	'owner' : owner,
  	'approvedList' : 'approvedList',
  	'requests' : 'requests'
  },...
]
```

### PATCH /cars/:facebook_id

Give any of the different keys and corresponding values that you would like to change about the cars details.

``` JavaScript
for(var key in req.body) {
  if(req.body.hasOwnProperty(key)){
    //do something with e.g. req.body[key]
    car[key] = b[key]
  }
}
```

### POST /cars/:facebook_id/approved

Adds a list of approved users into the approvedList section of the carschema:

``` JavaScript
for (var i=0; i<users_list.length; i++) {
  console.log(users_list[i]);
  car.approvedList.push(users_list[i]);
}
```

### POST /cars/:facebook_id/requests

Adds a requestid into the owner's request list. ALSO, makes a request schema in the request model.

``` JavaScript
app.post('/cars/:facebook_id/requests', function(req, res) {
  var b = req.body;

  var facebook_id = req.params.facebook_id;
  var request = new RequestModel();
  request.requestId = b.requestId;
  request.date = b.date;
  request.startTime = b.startTime;
  request.endTime = b.endTime;
  request.borrowerName = b.borrowerName;
  request.approved = b.approved;
```

### GET /cars/:facebook_id/requests/:requestId

Returns json format of the request that corresponds to the requestId:

``` JSON
{
  'requestId' : requestId,
  'date' : date,
  'startTime' : startTime,
  'endTime' : endTime,
  'borrowerName' : borrowerName,
  'approved' : {type: Number, min: 0, max: 2}
}
```

### PATCH /cars/:facebook_id/requests/:requestId

Edits the request information for a specific requestId. Very similar to PATCH for a carschema.
