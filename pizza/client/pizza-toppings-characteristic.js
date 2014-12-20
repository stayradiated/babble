'use strict';

var util = require('util');
var bleno = require('bleno');

var Pizza = require('./pizza');

function Toppings (pizza) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330002',
    properties: ['read', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Gets or sets the pizza toppings.',
      }),
    ],
  });

  this.pizza = pizza;
}

util.inherits(Toppings, bleno.Characteristic);

Toppings.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 1) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    this.pizza.setToppings(data.readUInt8(0));
    callback(this.RESULT_SUCCESS);
  }
};

Toppings.prototype.onReadRequest = function (offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(1);
    data.writeUInt8(this.pizza.toppings, 0);
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = Toppings;
