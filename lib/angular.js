var utils = require('./utils');

module.exports.generateI18N = function (localeTranslations) {
    return makePairValue(localeTranslations);
};

module.exports.angularReadme = function() {
    return 'How to use translations from Transmogrifier  for angular\n\n' +
        '1) 2 possibilities:\n' +
        '\t-> $ bower install angular-translate\n' +
        '\t-> download file from http://angular-translate.github.io/\n' +
        '2) Import angular-translate(.min).js in your index.html (before app.js)\n' +
        '3) Declare pascalprecht.translate as module in your angular.module(\'app_name\', [place "pascalprecht.translate here"]);\n' +
        '4) Import the translation files in your index.html\n' +
        '5) Finally choose your preferred language:\n\n' +
        'app.config([\'$translateProvider\', function ($translateProvider) {\n' +
        '\t$translateProvider.preferredLanguage(\'be_nl\');\n' +
        '}]);\n\n' +
        'Thank you for using Transmogrifier';
};

function makePairValue(localeTranslations) {
    if (!localeTranslations) return null;
    else {
        var angular = '/*\nTransmogrifier\nAngular Translations\n\nDate: ' + new Date() + '\n*/\n\n' +
            "var app = angular.module('place_your_appname_here');\n\n" +
            "app.config(['$translateProvider', function($translateProvider) {\n" +
            "$translateProvider.translations('" + localeTranslations.isoCode + '_' + localeTranslations.countryCode + "', {\n";
        for (var i = 0; i < localeTranslations.keys.length; i++) {
            var key = localeTranslations.keys[i];
            key.key = key.key.replace(/ /g, '_');
            angular += '\n' + key.key + ': "' + key.translation.value + '",';
            if (key.pluralizable) {
                var props = ['zero', 'one', 'two', 'few', 'many', 'other'];
                for (var plural in key.translation.plurals) {
                    if (props.indexOf(plural.toString()) != -1 && key.translation.plurals.hasOwnProperty(plural)) {
                        if (key.translation.plurals[plural]) angular += '\n' + key.key + '_' + plural + ': "' + key.translation.plurals[plural] + '",';
                    }
                }
            }
        }
        angular.split('%d').join('{{replace_by_your_quantity}}');
        angular = angular.substr(0,angular.length-1);
        angular += "\n});\n}]);";
        return angular;
    }
}