var twitter = require('ntwitter');


var twit = new twitter({
    consumer_key: 'dgOciSBpKOaxUMYbizGWFlUx0',
    consumer_secret: '2w91lTdlgt4wgy3pcW0C7Ub2hhmxEs7hvgQ0yVAIW64yj3SbHZ',
    access_token_key: '932933658-MLTehmnTK9NFklEo8rkhlLfgdSgZkdHo6pIR2Faz',
    access_token_secret: 'davkNieiAPJeOIFScSRpTke97rTv6rjqgvL3OGiCG3jQg'
});


export.getTwit = function (req, res, next) {

    console.log("TWITTT");
    console.log("body req" + req.body);

    twit.stream('statuses/filter', {
            track: req.body
        },
        function (stream) {
            stream.on('data', function (data) {
                console.log(data.text);
                console.log("___________________________________________________________________");

                res.send(data.text);
                res.end();
            });
        });
};