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
var PersonModel = require('./models/appModel').PersonModel;
var BorrowerModel = require('./models/appModel').BorrowerModel;

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes

//PERSON ROUTES:
app.delete('/person', function(req, res) {

  PersonModel.remove({ }, function(err, removed) {
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
});

app.delete('/person/:facebook_id', function(req, res) {
  var facebook_id = req.params.facebook_id;

  PersonModel.remove({ 'facebook_id' : facebook_id  }, function(err, removed) {
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
});


app.get('/person', function(req, res) {

  PersonModel.find({ }, function(err, person) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!person) {
      res.json({"error":"People not found"});
      return;
    }
    else {
      res.json(person);
      return;
    }
  });
});

app.post('/person', function(req, res) {
  var b = req.body;

  var person = new PersonModel();
  person.facebook_name = b.facebook_name;
  person.facebook_id = b.facebook_id;
  person.user_type = b.user_type;

  person.save(function(err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(b);
    res.sendStatus(200);
    return;
  })
})

app.get('/person/:facebook_id', function(req, res) {
  var facebook_id = req.params.facebook_id;

  PersonModel.findOne({ 'facebook_id' : facebook_id }, function(err, person) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!person) {
      res.json({"error":"Person not found"});
      return;
    }
    else {
      res.json(person);
      return;
    }
  });
});

//BORROWER ROUTES:
app.delete('/borrowers/:facebook_id', function(req, res) {
  var facebook_id = req.params.facebook_id;

  BorrowerModel.remove({ 'facebook_id' : facebook_id  }, function(err, removed) {
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
});


app.get('/borrowers', function(req, res) {

  BorrowerModel.find({ }, function(err, borrowers) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!borrowers) {
      res.json({"error":"Borrowers not found"});
      return;
    }
    else {
      res.json(borrowers);
      return;
    }
  });
});

app.post('/borrowers', function(req, res) {
  var b = req.body;

  var borrower = new BorrowerModel();
  borrower.borrower_name = b.borrower_name; 
  borrower.facebook_id = b.facebook_id;
  borrower.can_borrow = [];
  borrower.requests = [];

  borrower.save(function(err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(b);
    res.sendStatus(200);
    return;
  })
});

app.get('/borrowers/:facebook_id', function(req, res) {
  var facebook_id = req.params.facebook_id;

  BorrowerModel.findOne({ 'facebook_id' : facebook_id }, function(err, borrower) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!borrower) {
      res.json({"error":"Borrower not found"});
      return;
    }
    else {
      res.json(borrower);
      return;
    }
  });
});

app.post('/borrowers/:facebook_id/canborrow', function(req, res) {
  var b = req.body;
  var users_list = b.users;
  var facebook_id = req.params.facebook_id;


  BorrowerModel.findOne({ 'facebook_id' : facebook_id }, function(err, borrower) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!borrower) {
      res.json({"error":"Borrower not found"});
      return;
    }
    else {
      for (var i=0; i<users_list.length; i++) {
        console.log(users_list[i]);
        borrower.can_borrow.push(users_list[i]);
      }
      borrower.can_borrow.push(b.carId);

      borrower.save(function(err) {
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

//CARS ROUTES:
app.delete('/cars', function(req, res) {

  CarModel.remove({ }, function(err, removed) {
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
});

app.delete('/cars/:facebook_id', function(req, res) {
  var facebook_id = req.params.facebook_id;

  CarModel.remove({ 'facebook_id' : facebook_id  }, function(err, removed) {
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
});


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

  car.save(function(err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(b);
    res.sendStatus(200);
    return;
  })
});


app.get('/cars/:facebook_id', function(req, res) {
  var facebook_id = req.params.facebook_id;

  CarModel.findOne({ 'facebook_id' : facebook_id }, function(err, car) {
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


app.patch('/cars/:facebook_id', function(req, res) {
  var b = req.body;
  var facebook_id = req.params.facebook_id;

  CarModel.findOne({ 'facebook_id' : facebook_id }, function(err, car) {
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


app.post('/cars/:facebook_id/approved', function(req, res) {
  var b = req.body;
  var users_list = b.user;
  var facebook_id = req.params.facebook_id;


  CarModel.findOne({ 'facebook_id' : facebook_id }, function(err, car) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!car) {
      res.json({"error":"Car not found"});
      return;
    }
    else {
      console.log(typeof users_list);
      for (var i=0; i<users_list.length; i++) {
        console.log(users_list[i]);
        car.approvedList.push(users_list[i]);
      }

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


  CarModel.findOne({ 'facebook_id' : facebook_id }, function(err, car) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!car) {
      res.json({"error":"Car not found"});
      return;
    }
    else {
      car.requests.push(b.requestId);

      car.save(function(err) {
        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
        return;
      });

      request.save(function(err) {
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

app.get('/cars/:facebook_id/requests/:requestId', function(req, res) {
  var facebook_id = req.params.facebook_id;
  var requestId = req.params.requestId;

  RequestModel.findOne({ 'requestId' : requestId }, function(err, request) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!request) {
      res.json({"error":"Request not found"});
      return;
    }
    else {
      res.json(request);
      return;
    }
  });
});

app.patch('/cars/:facebook_id/requests/:requestId', function(req,res) {
  var facebook_id = req.params.facebook_id;
  var requestId = req.params.requestId;
  var b = req.body;

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
      request.save(function(err) {
        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
        return;
      })
    }
  })
});

var url = "0.0.0.0";
var port = process.env.PORT || 8080;

app.listen(port, url);
console.log('Express started on port ' + port + " at " + url);
