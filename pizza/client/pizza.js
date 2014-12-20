'use strict';

var util = require('util');
var events = require('events');

var PizzaCrust = {
  NORMAL:     0,
  DEEP_DISH:  1,
  THIN:       2,
};

var PizzaToppings = {
  NONE:            0,      // 00000000
  PEPPERONI:       1 << 0, // 00000001
  MUSHROOMS:       1 << 1, // 00000010
  EXTRA_CHEESE:    1 << 2, // 00000100
  BLACK_OLIVES:    1 << 3, // 00001000
  CANADIAN_BACON:  1 << 4, // 00010000
  PINEAPPLE:       1 << 5, // 00100000
  BELL_PEPPERS:    1 << 6, // 01000000
  SAUSAGE:         1 << 7, // 10000000
};

// PEPPERONI | EXTRA_CHEESE | PINEAPPLE = 00100101 = 0x25

var PizzaBakeResult = {
  HALF_BAKED:  0,
  BAKED:       1,
  CRISPY:      2,
  BURNT:       3,
  ON_FIRE:     4,
};

function Pizza () {
  events.EventEmitter.call(this);

  this.toppings = PizzaToppings.NONE;
  this.crust    = PizzaCrust.NORMAL;
}

util.inherits(Pizza, events.EventEmitter);

Pizza.prototype.setCrust = function (crust) {
  console.log('Setting Crust:', crust);

  for (var key in PizzaCrust) {
    if (PizzaCrust.hasOwnProperty(key)) {
      if (PizzaCrust[key] === crust) {
        console.log(key);
      }
    }
  }

  this.crust = crust;
};

Pizza.prototype.setToppings = function (toppings) {
  console.log('Setting Toppings:', toppings);

  for (var key in PizzaToppings) {
    if (PizzaToppings.hasOwnProperty(key)) {
      if (PizzaToppings[key] & toppings) {
        console.log(key);
      }
    }
  }

  this.toppings = toppings;
};

Pizza.prototype.bake = function (temperature) {
  var self = this;
  var time = temperature * 10;

  console.log('Baking pizza at %s degrees for %s seconds',
              temperature,
              time / 1000);

  setTimeout(function () {
    var result =
      (temperature < 350) ? PizzaBakeResult.HALF_BAKED:
      (temperature < 450) ? PizzaBakeResult.BAKED:
      (temperature < 500) ? PizzaBakeResult.CRISPY:
      (temperature < 600) ? PizzaBakeResult.BURNT:
                            PizzaBakeResult.ON_FIRE;

    self.emit('ready', result);
  }, time);
};

exports.Pizza           = Pizza;
exports.PizzaToppings   = PizzaToppings;
exports.PizzaCrust      = PizzaCrust;
exports.PizzaBakeResult = PizzaBakeResult;
