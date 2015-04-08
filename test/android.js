var expect = require('chai').expect;
var android = require('../lib/android');
var utils = require('../lib/utils');
var fs = require('fs');

before(function (done) {
    done();
});

after(function (done) {
    done();
});

describe('Android Suite', function () {
    it('Should generate xml from translation array', function (done) {
        var xmlHeaders = [{type:'android', header:'<?xml version="1.0" encoding="UTF-8"?>'},{type: 'ios', header: ''}];
        var docTypes = [{type: '', doctype:'nothing but air'}, {type: 'ios', doctype: 'plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"'}, {type: 'android', doctype:''}];

        var xml = android.generateI18N(utils.translation, docTypes, xmlHeaders);
        fs.writeFile("test.xml", xml, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
        expect(xml).not.to.equal(null);
        done();
    });

    it('Should not generate xml from translation array', function (done) {
        var xml = android.generateI18N(null);
        expect(xml).to.equal(null);
        done();
    });

    it('Should not return a new query result', function (done) {
        var result = utils.newQueryResult(utils.newError(null, null), null);
        expect(result.err.status).to.equal(null);
        expect(result.result).to.equal(null);
        done();
    });

});