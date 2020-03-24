exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.MessagingResponse();
    twiml.message('Thanks for eating local! Looking up restaurants in your neighborhood...');
    twiml.message('Test!'); 
    callback(null, twiml);
  };