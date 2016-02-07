var controllers = {
    twilio: require('./twilio')
};

module.exports = function(app) {
    // Routes used as webhooks by Twilio should all be secured by checking the
    // Twilio request signature - we can do this by using Express middleware
    // Provided by the Twilio module
    var webhook = controllers.twilio.webhook;

    // Twilio webhooks
    app.post('/voice', webhook, controllers.twilio.voice);
    // app.post('/sms', webhook, controllers.twilio.sms);

    // Home page and associated ajax endpoints
    // Render a public home page which displays the latest messages
    app.get('/', controllers.home.index);
};