var expect = require('chai').expect;
var ios = require('../lib/ios');
var utils = require('../lib/utils');
var fs = require('fs');

before(function (done) {
    done();
});

after(function (done) {
    done();
});

describe('IOS Suite', function () {
    it('Should generate xml from translation array', function (done) {
        var xmlHeaders = [
            {type: 'android', header: 'don\'t take this one'},
            {type: 'ios', header: '<?xml version="1.0" encoding="UTF-8"?>'}
        ];
        var docTypes = [
            {type: '', doctype: 'nothing but air'},
            {type: 'ios', doctype: 'plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"'},
            {type: 'android', doctype: 'nothing but air'}
        ];

        var pairvalue = ios.generateI18N(utils.translation, docTypes, xmlHeaders).pairvalue;
        fs.writeFile("test.strings", pairvalue, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
        expect(pairvalue).not.to.equal(null);
        done();
    });
});