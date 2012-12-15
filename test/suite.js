'use strict';

var fs = require('fs');
var mocha = require('mocha');
var should = require('should');

var Validator = require('./../lib/validator');

var paths = ['test/suite/tests/draft3', 'test/suite/tests/draft3/optional']

/**
 * Runs the JSON Schema Test Suite
 */
describe('JSON Schema Test Suite', function(){

  paths.forEach(function(path) {
    fs.readdirSync(path).forEach(function(file) {
      if (file == 'optional') return;

        var suites = JSON.parse(fs.readFileSync(path+"/"+file));
        suites.forEach(function(suite) {

          describe(suite.description, function() {

            suite.tests.forEach(function(test) {

              it(test.description, function() {
                var validator = new Validator();
                var result = validator.validate(test.data, suite.schema);
                return should.equal(test.valid, result.length === 0);
              });

            });
          });

        });

    });
  });

});