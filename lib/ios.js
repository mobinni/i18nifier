var jsonxml = require('jsontoxml');
var utils = require('./utils');

module.exports.generateI18N = function (localeTranslations, docTypes, xmlHeaders) {
    return {
        xml: makeXML(localeTranslations, docTypes, xmlHeaders),
        pairvalue: makePairValue(localeTranslations)
    };
};

function makePairValue (localeTranslations) {
    if ( !localeTranslations ) return null;
    else {
        var pairvalue = '/*\nTransmogrifier\nPairvalue file\n\nDate: ' + new Date() + '\n*/\n\n';
        for ( var i = 0; i < localeTranslations.keys.length; i++ ) {
            var key = localeTranslations.keys[i];
            /*  if (key.pluralizable) {
             var props = ['zero', 'one', 'two', 'few', 'many', 'other'];
             for (var plural in key.translation.plurals) {
             if (props.indexOf(plural.toString()) != -1 && key.translation.plurals.hasOwnProperty(plural)) {
             if(key.translation.plurals[plural]) pairvalue += key.key + '##{' + plural + "} = " + "'" +key.translation.plurals[plural] + "'" + ';\n';
             }
             }
             } else {*/
            if ( !key.pluralizable )pairvalue += '"' + key.key + '" = "' + key.translation.value + '";\n';
            // }
        }
        return pairvalue;
    }
}

function makeXML (localeTranslations, docTypes, xmlHeaders) {
    if ( !localeTranslations ) return null;
    else {
        var items = [];
        var plurals = [];
        for ( var i = 0; i < localeTranslations.keys.length; i++ ) {
            if ( localeTranslations.keys[i].pluralizable ) plurals.push(getPlurals(localeTranslations.keys[i]));
            // else items.push(getItem(localeTranslations.keys[i]));
        }
        var tempXml = jsonxml({
            plist: [
                {
                    name: 'plist',
                    attrs: {version: '1.0'},
                    children: [
                        // items,
                        plurals
                    ]
                }
            ]
        }, utils.determineOptions(docTypes, xmlHeaders, 'ios'));

        return tempXml.split('<plist><plist version="1.0">').join('<plist version="1.0">')
            .split('tempkey').join('key')
            .split('tempstring').join('string')
            .split('numkey').join('key')
            .split('<tempplurals>').join('')
            .split('key0').join('key').split('string0').join('string')
            .split('key1').join('key').split('string1').join('string')
            .split('key2').join('key').split('string2').join('string')
            .split('key3').join('key').split('string3').join('string')
            .split('key4').join('key').split('string4').join('string')
            .split('key5').join('key').split('string5').join('string')
            .split('</tempplurals>').join('')
            .split('</plist></plist>').join('</plist>');
    }
}

function getItem (key) {
    return {
        dict: {
            key: key.key,
            dict: {
                key: 'NSStringLocalizedFormatKey',
                string: key.translation.value
            }

        }
    };
}

function getPlurals (key) {
    var children = getPluralChildren(key.translation.plurals, key.translation.value);
    return {
        dict: {
            key: (key.translation.value.indexOf('%d') != -1 ? key.key : '%d ' + key.key),
            dict: {
                key: 'NSStringLocalizedFormatKey',
                string: (key.translation.value.split('%d').join('%#@num_value@')),
                numkey: 'num_value',
                dict: children
            }

        }
    };
}

function getPluralChildren (plurals, value) {
    var props = ['zero', 'one', 'two', 'few', 'many', 'other'];
    var tempplurals = {

    };
    var pluralCounter = 0;
    for ( var k in plurals ) {
        /* istanbul ignore else */
        if ( props.indexOf(k.toString()) != -1 && plurals.hasOwnProperty(k.toString()) ) {
            /* istanbul ignore else */
            if ( plurals[k] ) {
                var key = 'key' + pluralCounter;
                var string = 'string' + pluralCounter;
                tempplurals[key] = k;
                tempplurals[string] = plurals[k];
            }
            pluralCounter++;
        }
    }
    return {
        key: 'NSStringFormatSpecTypeKey',
        string: 'NSStringPluralRuleType',
        tempkey: 'NSStringFormatValueType',
        tempstring: 'd',
        tempplurals: tempplurals
    }
}


