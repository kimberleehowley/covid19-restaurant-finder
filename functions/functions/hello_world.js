const got = require('got');

exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.MessagingResponse();
   
    got('http://localhost:5000/restaurants', {json: true}).then(response => {
      twiml.message(response.body);
      callback(null, twiml);
    }).catch(error => {
      console.log(error.response.body);
      callback(error);
    });
   };