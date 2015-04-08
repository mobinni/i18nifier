var exporter = module.exports;

var android = require('./lib/android');
var ios = require('./lib/ios');
var angular = require('./lib/angular');

var fs = require('fs');
var fse = require('fs-extra');
var EasyZip = require('easy-zip').EasyZip;
var utils = require('./lib/utils');
var archiver = require('archiver');
var dateformat = require('dateformat');

var platforms = ['All', 'Android', 'iOS', 'Angular'];


exporter.getAllPlatforms = function () {
    return platforms;
};

exporter.generateArchive = function (platformId, result, xmlHeaders, docTypes, next) {
    var archive = archiver('zip');
    var platform = getPlatformName(platformId);

    archive.on('error', function (err) {
        //   next(err);
    });

    for (var i = 0; i < result.length; i++) {
        var localeInfo = result[i].localeInfo;
        var json = result[i].json;
        var xmls = generatePlatformXML(json, platformId, xmlHeaders, docTypes);

        determineArchiveMethod(platformId, archive, localeInfo, xmls);
    }

    if(platformId==3 || platformId ==0) archive.append(angular.angularReadme(), {name: 'README.md'})

    archive.finalize(function (err, bytes) {
        if (err) {
            throw err;
        }
        console.log(bytes + ' total bytes');
    });

    return { archive: archive, platform: platform };
};

exporter.generateAndroidXML = function (localeTranslations) {
    return android.generateI18N(localeTranslations)
};

function generatePlatformXML(localeTranslations, platformId, docTypes, xmlHeaders) {
    var xmls = {};
    if (platformId == platforms.indexOf('Android'))  xmls.android = android.generateI18N(localeTranslations, docTypes, xmlHeaders);
    else if (platformId == platforms.indexOf('iOS')) xmls.ios = ios.generateI18N(localeTranslations, docTypes, xmlHeaders);
    else if (platformId == platforms.indexOf('Angular')) xmls.angular = angular.generateI18N(localeTranslations);
    else xmls = generateAllPlatforms(localeTranslations, docTypes, xmlHeaders);
    return xmls;
}

function generateAllPlatforms(localeTranslations, docTypes, xmlHeaders) {
    var xmls = {};
    xmls.android = android.generateI18N(localeTranslations, docTypes, xmlHeaders);
    xmls.ios = ios.generateI18N(localeTranslations, docTypes, xmlHeaders);
    xmls.angular = angular.generateI18N(localeTranslations);
    return xmls;
}

function getPlatformName(id) {
    if (id >= 0 && id < platforms.length)  return utils.newQueryResult(null, platforms[id]);
    else return utils.newQueryResult(utils.newError(400, 'Platform not found'), null);
}


function determineArchiveMethod(platformId, archive, localeInfo, xmls) {
    var suffix = localeInfo.countryCode + '_' + localeInfo.isoCode;

    if (platformId == 1) archiveAndroid(archive, xmls.android, 'values-' + suffix);
    else if (platformId == 2) {
        archiveIOS(archive, xmls.ios.xml, 'ios-' + localeInfo.countryCode, 'xml');
        archiveIOS(archive, xmls.ios.pairvalue, 'ios-' + suffix, 'strings');
    }
    else if (platformId == 3) archiveAngular(archive, xmls.angular, 'angular-' + suffix);
    else {
        archiveAll(archive, xmls, 'android/values-' + suffix, ['ios/ios-' + suffix, 'ios/ios-'
            + suffix], 'angular/angular-' + suffix);
    }
}

function archiveAndroid(archive, xml, androidPath) {
    archive
        .append(null, { name: androidPath + '/' })
        .append(xml, { name: androidPath + '/strings.xml' })
}

function archiveIOS(archive, translations, iosPath, ext) {
    archive
        .append(null, { name: iosPath + '/' })
        .append(translations, { name: iosPath + '/ios.' + ext })
}

function archiveAngular(archive, angularFile, angularPath) {
    var fileName = null;
    if (angularPath.indexOf('angular/') != -1) fileName = angularPath.split('angular/')[1];
    else fileName = angularPath;
    archive
        .append(null, {name: angularPath + '/'})
        .append(angularFile, {name: angularPath + '/' + fileName + '.js'})
}

function archiveAll(archive, xmls, androidPath, iosPath, angularPath) {
    for (var property in xmls) {
        if (xmls.hasOwnProperty(property)) {
            if (property == 'android') archiveAndroid(archive, xmls.android, androidPath);
            if (property == 'ios') {
                archiveIOS(archive, xmls.ios.xml, iosPath[0], 'xml');
                archiveIOS(archive, xmls.ios.pairvalue, iosPath[1], 'strings');
            }
            if (property == 'angular') archiveAngular(archive, xmls.angular, angularPath)
        }
    }
}