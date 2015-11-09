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

So if you want to follow REST guidelines:
http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api (There is a pretty good walkthrough)

I have two comments on this endpoint relating to following REST guidelines. 
1. When you want to create an object in REST you generally want to POST to /createcar not /createcar/:carId this way you don't have to have have an id to create a car, your server should automatically create one. The return body should then contain the ID of the car you just created. THe request body will then contain all teh fields of the car.
2. This is pretty nitpicky, but in REST you want endpoints to be nouns and meaningful. So instead of /createcar just use /cars
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
Same anming comment as before. This could be /cars
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
Rather than make a specific route for each thing you want to change you should have a different endpoint that is:
PATCH /cars/:carId
THe body of this request will be JSON for each key and value you want to change on the object
Use this route to update the parked location of the car.

This route takes parameters in the following form:
``` JSON
{
  'parkedLocation' : parkedLocation
}
```

This route returns and HTTP response code, 500 for error, or 200 for success.

### POST /updateapprovedlist/:carId:
Same comment as above on this one.
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

I would recommend a higher level refactoring of requests. Rather than mantaining a separate scheduledRequest and pendingREquests queue I would just have an attribute of a request that is something like "isPending" when a request is created "isPending" is true, when an owner approves a request you could then make a PATCH request to update "isPending" to be false.
### POST /updatescheduledrequests/:carId:/:requestId:
I would restructure this as: POST /cars/:carId/requests
Since every request has a car it belongs to this makes it clear what car you are making a request for. 
You don't want to have to have to know what the requestId is to make a new request, the server should automatically generate one. The body of this request should be more like:
``` JSON
{
  'requestField1' : blah,
  'requestField2' : blah
}
```

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
Based on my above commments I woudl remove this endpoint
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
Same as above.
Also in general if you want to delete something use the HTTP verb DELETE
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
I would restructure this to be more like:
DELETE /cars/:carId/requests/:requestId
going with the notion of getting rid of both schedules
Use this route to delete a request from a car's scheduled requests.

This route takes parameters in the following form:
``` JSON
{
  'carId' : carId,
  'requestId' : requestId
}
```
