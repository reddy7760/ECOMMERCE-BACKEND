//es 5 feature
//const cityName= require('./math-util').city;
//const country = require('./math-util').country;
//console.log(city);
//console.log(counrty);
const { city: cityName, country,details,state = 'karnataka'} = require('./math-util');
console.log(cityName,country,state);
details();