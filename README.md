# Lab3Server
This is the server for lab 3.

IP: 45.55.65.113

## Routes

All routes return 500 for error.

``` JavaScript
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
```
### POST /createcar/:carId:

Use this route to create a car.

This route takes parameters in the following form:

``` JSON
{
  'make' : make,
  'model' : model,
  'licensePlate' : licensePlate,
  'parkedLocation' : parkedLocation,
  'keysLocation' : keysLocation,
  'isAutomatic' : isAutomatic,
  'moneyPolicy' : moneyPolicy,
  'owner' : owner
}
```

This route returns and HTTP response code, 500 for error, or 200 for success.

### GET /carinfo/:carId:

Use this route to get info about a car.

It returns data in the following form:

``` JSON
{
  'make' : make,
  'model' : model,
  'licensePlate' : licensePlate,
  'parkedLocation' : parkedLocation,
  'keysLocation' : keysLocation,
  'isAutomatic' : isAutomatic,
  'moneyPolicy' : moneyPolicy,
  'owner' : owner
}
```

### POST /updateparked/:carId:

Use this route to update the parked location of the car.

This route takes parameters in the following form:
``` JSON
{
  'parkedLocation' : parkedLocation
}
```

This route returns and HTTP response code, 500 for error, or 200 for success.

### POST /updateapprovedlist/:carId:

Use this route to ~~update~~ add to the people on the approved list for a given car.

This route takes parameters in the following form:
``` JSON
{
  'newPeople' : [
    'name' : name,
    ...
  ]
}
```
This route returns and HTTP response code, 500 for error, or 200 for success.

### POST /updatescheduledrequests/:carId:/:requestId:

Use this route to add a request to a car's scheduled requests and remove the request from the car's pending requests.

This route takes parameters in the following form:
``` JSON
{
  'carId' : carId,
  'requestId' : requestId
}
```

This route returns and HTTP response code, 500 for error, or 200 for success.

### POST /updatependingrequests

Use this route to add a request to a car's pending requests.

This route takes parameters in the following form:
``` JSON
{
  'carId' : carId,
  'requestId' : requestId
  'request' : [
    {
      'date' : date,
      'startTime' : startTime,
      'endTime' : endTime,
      'borrowerName' : borrowerName
    }
  ]

}
```

This route returns and HTTP response code, 500 for error, or 200 for success.

### POST /deletefrompending

Use this route to delete a request from a car's pending requests.

This route takes parameters in the following form:
``` JSON
{
  'carId' : carId,
  'requestId' : requestId
}
```

This route returns and HTTP response code, 500 for error, or 200 for success.

### POST /deletefromscheduled

Use this route to delete a request from a car's scheduled requests.

This route takes parameters in the following form:
``` JSON
{
  'carId' : carId,
  'requestId' : requestId
}
```
