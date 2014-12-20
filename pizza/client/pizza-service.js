'use strict';

var util = require('util');
var bleno = require('bleno');

var Crust = require('./pizza-crust-characteristic');
var Toppings = require('./pizza-toppings-characteristic');
var Bake = require('./pizza-bake-characteristic');

function Service (pizza) {
  bleno.PrimaryService.call(this, {
    uuid: '13333333333333333333333333333337',
    characteristics: [
      new Crust(pizza),
      new Toppings(pizza),
      new Bake(pizza),
    ],
  });
}

util.inherits(Service, bleno.PrimaryService);

module.exports = Service;
