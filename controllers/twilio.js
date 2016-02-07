var twilio = require('twilio');

// Webhook middleware, check request signature
exports.webhook = twilio.webhook({
    // Only validate requests in production
    validate: true, // process.env.NODE_ENV === 'production',

    // Manually configure the host and protocol used for webhook config - this
    // is the URL our Twilio number will hit in production
    host:'http://localhost:3000/',
    protocol:'https'
});

// Handle incoming voice calls
exports.voice = function(request, response) {
    var twiml = new twilio.TwimlResponse();

    twiml.say('Hi there! Thanks for calling to wish Joe good luck this season. Please leave your message after the beep - you can end the message by pressing any button. Get ready!')
        .record({
            maxLength:120,
            action:'/recording'
        });

    response.send(twiml);
};

