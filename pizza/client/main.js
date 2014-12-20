'use strict';

var util = require('util');
var bleno = require('bleno');

var pizza = require('./pizza');
var Service = require('./pizza-service');

var name = 'Dominoes';
var service = new Service(new pizza.Pizza());

bleno.on('stateChange', function (state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising(name, [ service.uuid ], function (err) {
      if (err) {
        console.log(err);
      }
    });
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function (err) {
  if (! err) {
    console.log('advertising');
    bleno.setServices([ service ]);
  }
});


