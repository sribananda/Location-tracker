//console.log("Test");
/*const express = require('express');
const request = require('request');
const app = express();

app.get('/', (req, res) => {
    // Retrieve user's IP address
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    // Make a request to IP geolocation API
    request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const country = data.countryCode; // Modify to use 'countryCode' instead of 'country'
  
        if (country) {
          const currency = getCurrencyForCountry(country);
  
          // Render the response with the detected country and currency
          res.send(`You are from ${country}. Currency: ${currency}`);
        } else {
          res.send('Country code not found.');
        }
      } else {
        res.send('Error occurred while detecting country.');
      }
    });
  });
 

 /* app.get('/', (req, res) => {
    // Retrieve user's IP address
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    // Make a request to IP geolocation API
    request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
  
        if (data.status === 'success') {
          const country = data.countryCode;
          const currency = getCurrencyForCountry(country);
  
          // Render the response with the detected country and currency
          res.send(`You are from ${country}. Currency: ${currency}`);
        } else {
          res.send('Failed to detect country.');
        }
      } else {
        res.send('Error occurred while detecting country.');
      }
    });
  });
  */

  
/*
  //Implementing currency conversion function
  function getCurrencyForCountry(country) {
    // Make a request to currency conversion API
    const accessKey = 'e0af95e4eb2056b5622d547fe1722728'; 
    const endpoint = `http://data.fixer.io/api/latest?access_key=${accessKey}`;
  
    // Retrieve exchange rates
    request(endpoint, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const rates = data.rates;
        
        // Map country codes to currency symbols
        const countryCurrencyMap = {
          'US': 'USD',
          'GB': 'GBP',
          'IN' : 'INR',
        };
  
        // Get the currency symbol for the country
        const currency = countryCurrencyMap[country];
  
        // Perform currency conversion if needed
        if (currency && currency !== 'USD') {
          const conversionRate = rates[currency];
          return `USD ${conversionRate.toFixed(2)}`;
        }
      }
    });
  
    return 'USD'; // Default currency if no conversion is needed or if an error occurred
  }
  
const port = 3000; // Change the port number if needed

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/


const express = require('express');
const geoip = require('geoip-lite');
const app = express();

app.get('/', (req, res) => {
  // Retrieve user's IP address
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Perform IP geolocation lookup using MaxMind GeoIP2
  const geo = geoip.lookup(ip);

  if (geo && geo.country) {
    const country = geo.country;
    const currency = getCurrencyForCountry(country);

    // Render the response with the detected country and currency
    res.send(`You are from ${country}. Currency: ${currency}`);
  } else {
    // Fallback: Provide default country and currency
    const defaultCountry = 'Unknown';
    const defaultCurrency = 'USD';

    res.send(`Failed to detect country. Default: ${defaultCountry}. Currency: ${defaultCurrency}`);
  }
});

// Implementing currency conversion function
function getCurrencyForCountry(country) {
  const countryCurrencyMap = {
    'US': 'USD',
    'GB': 'GBP',
    'IN': 'INR',
  };

  return countryCurrencyMap[country] || 'USD'; // Default currency if no mapping found
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


