// init project
var express = require('express');
var app = express();
var cors = require('cors');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Helper function to check if a date is valid
const isValidDate = (date) => !isNaN(date.getTime());

app.get('/api/:date?', function (req, res) {
  let dateString = req.params.date;

  let date;

  // If no date is provided, use the current date
  if (!dateString) {
    date = new Date();
  } else {
    // If the date string is a number, parse it as an integer (Unix timestamp in milliseconds)
    if (!isNaN(dateString)) {
      dateString = parseInt(dateString);
    }
    date = new Date(dateString);
  }

  // Check if the date is valid
  if (!isValidDate(date)) {
    res.json({ error: 'Invalid Date' });
    return;
  }

  // Format the response
  let unixTimestamp = date.getTime();
  let utcFormat = date.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcFormat });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
