var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// config mongoose
var dbConfig = require('./config/db');
mongoose.connect(dbConfig.url);

// data schemas
var CarModel = require('./models/appModel').CarModel;
var RequestModel = require('./models/appModel').RequestModel;

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/cars', function(req, res) {

  CarModel.find({ }, function(err, cars) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!cars) {
      res.json({"error":"Cars not found"});
      return;
    }
    else {
      res.json(cars);
      return;
    }
  });
});

app.post('/cars', function(req, res) {
  var b = req.body;

  var car = new CarModel();
  car.carId = b.carId;
  car.make = b.make;
  car.model = b.model;
  car.licensePlate = b.licensePlate;
  car.parkedLocation = b.parkedLocation;
  car.keysLocation = b.keysLocation;
  car.isAutomatic = b.isAutomatic;
  car.moneyPolicy = b.moneyPolicy;
  car.owner = b.owner;
  car.requests = [];

  car.save(function(err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(car.make);
    res.sendStatus(200);
    return;
  })
});


app.get('/cars/:carId', function(req, res) {
  var carId = req.params.carId;

  CarModel.findOne({ 'carId' : carId }, function(err, car) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!car) {
      res.json({"error":"Car not found"});
      return;
    }
    else {
      res.json(car);
      return;
    }
  });
});


app.patch('/cars/:carId', function(req, res) {
  var b = req.body;
  var carId = req.params.carId;

  CarModel.findOne({ 'carId' : carId }, function(err, car) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!car) {
      res.json({"error":"Car not found"});
      return;
    }
    else {
      for(var key in req.body) {
        if(req.body.hasOwnProperty(key)){
          //do something with e.g. req.body[key]
          car[key] = b[key]
        }
      }
      car.save(function(err) {
        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
        return;
      })
    }
  });
});


app.post('/cars/:carId/requests', function(req, res) {
  var b = req.body;

  var carId = req.params.carId;

  var request = new RequestModel();
  request.requestId = b.requestId;
  request.date = b.date;
  request.startTime = b.startTime;
  request.endTime = b.endTime;
  request.borrowerName = b.borrowerName;
  request.approved = b.approved;


  CarModel.findOne({ 'carId' : carId }, function(err, car) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!car) {
      res.json({"error":"Car not found"});
      return;
    }
    else {
      car.requests.push(request);

      car.save(function(err) {
        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
        return;
      });
    }
  });
});

app.get('/cars/:carId/requests/:requestId', function(req, res) {
  var carId = req.params.carId;
  var requestId = req.params.requestId;

  CarModel.findOne({ 'carId' : carId }, function(err, car) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!car) {
      res.json({"error":"Car not found"});
      return;
    }
    else {
      RequestModel.findOne({'requestId' : requestId}, function(err, request){
        if (err) {
          res.sendStatus(500);
          return;
        }

        if (!request) {
          res.json({"error": "Request not found"});
          return;
        }
        else {
          res.json(request);
          return;
        }
      })
    }
  });
});

app.patch('/cars/:carId/requests/:requestId', function(req,res) {
  var carId = req.params.carId;
  var requestId = req.params.requestId;

  CarModel.findOne({ 'carId' : carId }, function(err, car) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!car) {
      res.json({"error":"Car not found"});
      return;
    }
    else {
      RequestModel.findOne({'requestId' : requestId}, function(err, request){
        if (err) {
          res.sendStatus(500);
          return;
        }

        if (!request) {
          res.json({"error": "Request not found"});
          return;
        }
        else {
          for(var key in req.body) {
            if(req.body.hasOwnProperty(key)){
              //do something with e.g. req.body[key]
              request[key] = b[key]
            }
          }
          reqest.save(function(err) {
            if (err) {
              res.sendStatus(500);
              return;
            }

            res.sendStatus(200);
            return;
          })
        }
      })
    }
  });
});

// app.post('/userdata/:appId', function(req, res) {
//   var appId = req.params.appId;
//   var imageKey = req.body.imageKey;
//   var imageLocation = req.body.imageLocation

//   if (imageKey == null || imageLocation == null) {
//     res.json({"error":"Set the imageKey and imageLocation in the body"});
//     return;
//   }
  
//   console.log(appId);
//   // here we shall get the user's data and save it to mongo
//   AppModel.findOne({ 'appId' : appId }, function(err, a) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }

//     if (!a) {
//       var imageModel = new ImageModel();
//       imageModel.imageKey = imageKey;
//       imageModel.imageLocation = imageLocation;
//       var newApp = new AppModel();

//       newApp.appId = appId;
//       newApp.userImages = [imageModel]; // TODO: Add image from imagePath, imageLocation

//       newApp.save(function(err) {
//         if (err) {
//           res.sendStatus(500);
//           return;
//         }

//         res.sendStatus(200);
//         return;
//       });
//     } else {
//       console.log("APP");
//       var imageModel = new ImageModel();
//       imageModel.imageKey = imageKey;
//       imageModel.imageLocation = imageLocation;
//       a.userImages.push(imageModel);

//       a.save(function(err) {
//         if (err) {
//           res.sendStatus(500);
//           return;
//         }

//         res.sendStatus(200);
//         return;
//       });
//     }
//   });
// });

// app.get('/userdata/:appId', function(req, res) {
//   var appId = req.params.appId;

//   console.log(appId);
//   // here we shall get the users data from mongo and return this to the app.
//   AppModel.findOne({ 'appId' : appId }, function(err, app) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }

//     if (!app) {
//       console.log("NO app");
//       var newApp = new AppModel();

//       newApp.appId = appId;
//       newApp.userImages = []; 

//       newApp.save(function(err) {
//         if (err) {
//           res.sendStatus(500);
//           return;
//         }

//         res.json({'data':newApp.userImages});
//         return;
//       });
//     } else {
//       var images = app.userImages;
//       res.json({'data':images});
//       return;
//     }
//   });
// });

var url = "0.0.0.0";
var port = process.env.PORT || 8080;

app.listen(port, url);
console.log('Express started on port ' + port + " at " + url);