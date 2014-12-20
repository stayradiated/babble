'use strict';

var util = require('util');
var bleno = require('bleno');

var Pizza = require('./pizza');

function Bake (pizza) {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330003',
    properties: ['notify', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Bakes the pizza and notifies when done baking.',
      }),
    ],
  });

  this.pizza = pizza;
}

util.inherits(Bake, bleno.Characteristic);

Bake.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {

  console.log(arguments);

  if (offset) {
    console.log('RESULT_ATTR_NOT_LONG');
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 2) {
    console.log('RESULT_INVALID_ATTRIBUTE_LENGTH');
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    var self = this;
    var temperature = data.readUInt16BE(0);

    this.pizza.once('ready', function (result) {
      if (self.updateValueCallback) {
        var data = new Buffer(1);
        data.writeUInt8(result, 0);
        self.updateValueCallback(data);
      }
    });

    this.pizza.bake(temperature);
    callback(this.RESULT_SUCCESS);
  }

};

module.exports = Bake;
