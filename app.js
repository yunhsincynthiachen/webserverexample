var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');

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
app.delete('/borrowers', function(req, res) {

  BorrowerModel.remove({ }, function(err, removed) {
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
});

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

app.delete('/cars/:facebook_id/approved/:borrower_id', function(req, res) {
  var facebook_id = req.params.facebook_id;
  var borrower_id = req.params.borrower_id;

  CarModel.findOne({ 'facebook_id' : facebook_id  }, function(err, car) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    if (!car) {
      res.json({"error":"Car not found"});
      return;
    }
    else {
      car.approvedList.remove(borrower_id);
      console.log(borrower_id);

      BorrowerModel.findOne({'facebook_id' : borrower_id}, function(err,borrower) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        if (!borrower) {
          res.json({"error":"Borrower not found"});
          return;
        }
        else {
          borrower.can_borrow.remove(facebook_id);
          borrower.save(function(err) {
            if (err) {
              res.sendStatus(500);
              return;
            }
            else {
              car.save(function(err) {
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

      })
    }
  });                                   
});


app.post('/cars/:facebook_id/approved', function(req, res) {
  var b = req.body;
  var user = b.user;
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
      for (var i=0; i<user.length; i++) {
        car.approvedList.push(user[i]);
        BorrowerModel.findOne({ 'facebook_id' : user[i]}, function(err, borrower) {
          if (err) {
            res.sendStatus(500);
            return;
          }
          if (!borrower) {
            res.json({"error":"Borrower not found"});
            return;
          }
          else {
            borrower.can_borrow.push(facebook_id);
            borrower.save(function(err) {
              if (err) {
                res.sendStatus(500);
                return;
              }
              else {
                car.save(function(err) {
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
        })
      }
    }
  });
});

//REQUESTS RELATED REQUESTS
app.delete('/requests', function(req, res) {

  RequestModel.remove({ }, function(err, removed) {
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
});

app.delete('/requests/:requestId/:borrowerId/:ownerId', function(req, res) {
  var requestId = req.params.requestId;
  var borrowerId = req.params.borrowerId;
  var ownerId = req.params.ownerId;

  CarModel.findOne({ 'facebook_id' : ownerId  }, function(err, car) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    if (!car) {
      res.json({"error":"Car not found"});
      return;
    }
    else {
      car.requests.remove(requestId);

      BorrowerModel.findOne({'facebook_id' : borrowerId}, function(err,borrower) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        if (!borrower) {
          res.json({"error":"Borrower not found"});
          return;
        }
        else {
          borrower.requests.remove(requestId);
          borrower.save(function(err) {
            if (err) {
              res.sendStatus(500);
              return;
            }
            else {
              car.save(function(err) {
                if (err) {
                  res.sendStatus(500);
                  return;
                }

                RequestModel.remove({ 'requestId' : requestId  }, function(err, removed) {
                  if (err) {
                    res.sendStatus(500);
                    return;
                  }
                  res.sendStatus(200);
                  return;
                });
              })
            }
          })
        }

      })
    }
  });   
});


app.get('/requests', function(req, res) {

  RequestModel.find({ }, function(err, requests) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!requests) {
      res.json({"error":"Requests not found"});
      return;
    }
    else {
      res.json(requests);
      return;
    }
  });
});

app.post('/cars/:facebook_id/requests', function(req, res) {
  var b = req.body;

  var facebook_id = req.params.facebook_id;

  var request = new RequestModel();
  request.ownerId = b.ownerId;
  request.ownerName = b.ownerName;
  request.requestId = b.requestId;
  request.date = b.date;
  request.startTime = b.startTime;
  request.endTime = b.endTime;
  request.borrowerName = b.borrowerName;
  request.borrowerId = b.borrowerId;
  request.optmessage = b.optmessage;
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
      BorrowerModel.findOne({'facebook_id' : b.borrowerId}, function(err, borrower) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        if (!borrower) {
          res.json({"error":"Borrower not found"});
          return;
        }
        else {
          borrower.requests.push(b.requestId);
          car.requests.push(b.requestId);

          car.save(function(err) {
            if (err) {
              res.sendStatus(500);
              return;
            }
            request.save(function(err) {
              if (err) {
                res.sendStatus(500);
                return;
              }
              borrower.save(function(err) {
                if (err) {
                  res.sendStatus(500);
                  return;
                }
                
                res.sendStatus(200);
                return;
              })
            })
          });
        }
      })
    }
  });
});

app.get('/requests_owner/:ownerId', function(req, res) {
  var ownerId = req.params.ownerId;

  RequestModel.find({ 'ownerId' : ownerId }, function(err, request) {
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

app.get('/requests_borrower/:borrowerId', function(req, res) {
  var borrowerId = req.params.borrowerId;

  RequestModel.find({ 'borrowerId' : borrowerId }, function(err, request) {
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

app.get('/requests_current/:ownerId/:datem/:dated/:datey', function(req,res) {
  var ownerId = req.params.ownerId;
  var date = req.params.datem + "/" + req.params.dated + "/" + req.params.datey;

  var list_current_requests = [];
  var myCalls = [];
  RequestModel.find({ 'ownerId' : ownerId }, function(err, request) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (!request) {
      res.json({"error":"Request not found"});
      return;
    }
    else {

      for (var k =0; k<request.length; k++){
        var current_date = request[k]['date']
        var indices = [];
        for(var i=0; i<current_date.length;i++) {
            if (current_date[i] === "/") indices.push(i);
        }
        
        var request_month = current_date.substring(0, indices[0]-1)
        var request_day = current_date.substring(indices[0]+1,indices[1]-1)
        var request_year = current_date.substring(indices[1]+1,indices[2]-1)
        console.log(request_month, request_year, request_day);
        if (request[k]['date'] == date){
          list_current_requests.push(request[k]);
        }
      }

      // function find_current(owner) {
      //   return function doQuery (cb) {

      //   }
      // }
      res.json(list_current_requests);
      return;
    }
  });
})

app.get('/requests_cars/:borrowerId/:datem/:dated/:datey/:start_time_request/:end_time_request', function(req,res) {
  var borrowerId = req.params.borrowerId;
  var date = req.params.datem + "/" + req.params.dated + "/" + req.params.datey;

  if ((req.params.start_time_request).substring((req.params.start_time_request).indexOf(":"),(req.params.start_time_request).length).length != 3) {
    var start_time_request = req.params.start_time_request + "0"
  }
  else {
    var start_time_request = req.params.start_time_request;
  }

  if ((req.params.end_time_request).substring((req.params.end_time_request).indexOf(":"),(req.params.end_time_request).length).length != 3){
    var end_time_request = req.params.end_time_request + "0"
  }
  else {
    var end_time_request = req.params.end_time_request;
  }

  // console.log(date);
  // console.log(start_time_request);
  // console.log(end_time_request);

  var list_users = [];
  var myCalls = [];
  BorrowerModel.findOne({ 'facebook_id' : borrowerId}, function(err, borrower) {
    if (err) {
      res.sendStatus(500);
      return;
    } 
    if (!borrower) {
      res.json({"error":"Borrower not found"});
      return;
    }
    else {
      for (var l=0; l<borrower["can_borrow"].length; l++){
        myCalls.push(isavailable(borrower["can_borrow"][l]));
      }

      function isavailable(owner) {
        return function doQuery (cb) {
          RequestModel.find({ 'ownerId' : owner }, function(err2, request) {
            if (err2) {
              res.sendStatus(500);
              return;
            }

            if (!request) {
              res.json({"error":"Request not found"});
              return;
            }
            else {
              var isAvailable = 0;
              // console.log(request);
              for (var m=0; m<request.length;m++) {
                // console.log(request[m]["date"], date);
                if ((request[m]["startTime"]).substring(request[m]["startTime"].indexOf(":"), (request[m]["startTime"]).length).length != 3){
                  request_start = request[m]["startTime"] + "0"
                }
                else {
                  request_start = request[m]["startTime"]
                }

                if ((request[m]["endTime"]).substring(request[m]["endTime"].indexOf(":"), (request[m]["endTime"]).length).length != 3) {
                  request_end = request[m]["endTime"] + "0"
                }
                else {
                  request_end = request[m]["endTime"]
                }

                console.log(request_start);
                console.log(request_end);

                if (request[m]["date"] == date){
                  if (parseInt((request_start).replace(":","")) <= parseInt(start_time_request.replace(":","")) && parseInt(start_time_request.replace(":","")) <= parseInt((request_end).replace(":",""))){
                    isAvailable = 1;
                  }
                  else if (parseInt((request_start).replace(":","")) <= parseInt(end_time_request.replace(":","")) && parseInt(end_time_request.replace(":","")) <= parseInt((request_end).replace(":",""))){
                    isAvailable = 1;
                  }
                  else if (parseInt((request_start).replace(":","")) >= parseInt(start_time_request.replace(":","")) && parseInt(end_time_request.replace(":","")) >= parseInt((request_end).replace(":",""))){
                    isAvailable = 1;
                  }
                }
              }
              // console.log(isAvailable);
              if (isAvailable == 0){
                // getUser(owner, function(user) { 
                  list_users.push(owner)
                // });
                // console.log(list_users);
              }
              cb(); 
            }
          });
        }
      }

      // function getUser(username, callback) {
      //   console.log("here")
      //   CarModel.findOne({"facebook_id":username}, function(err, user) {
      //     // console.log(user);
      //     callback(user);
      //   });
      // };

      async.parallel(myCalls, function(err, result) {
        /* this code will run after all calls finished the job or
           when any of the calls passes an error */
        if (err) {
          return console.log(err);
        }
        res.json(list_users);
        return;
      });
    }
  });
});



app.patch('/requests/:requestId', function(req,res) {
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
