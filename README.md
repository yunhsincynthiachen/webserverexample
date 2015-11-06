# Lab3Server
This is the server for lab 3. 

IP: 45.55.65.113

## Routes

All routes return 500 for error. 

app.post('/createcar', function(req, res) {
  var b = req.body;

  var car = new CarModel();
  car.make = b.make;
  car.model = b.model;
  car.licensePlate = b.licensePlate;
  car.parkedLocation = b.parkedLocation;
  car.keysLocation = b.keysLocation;
  car.isAutomatic = b.isAutomatic;
  car.moneyPolicy = b.moneyPolicy;
  car.owner = b.owner;

### GET /createcar

Use this route to create a car.

This route takes parameters in the following form:

``` JSON
{
	'make' : make,
	'model' : model
}
```

This route returns and HTTP response code, 500 for error, or 200 for success.