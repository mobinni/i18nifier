var jsonxml = require('jsontoxml');
var utils = require('./utils');


module.exports.generateI18N = function (localeTranslations, docTypes, xmlHeaders) {
    return makeXML(localeTranslations, docTypes, xmlHeaders);
};

function makeXML (localeTranslations, docTypes, xmlHeaders) {
    var items = [];
    var plurals = [];
    if ( !localeTranslations ) return null;
    else {

        for ( var i = 0; i < localeTranslations.keys.length; i++ ) {
            if ( localeTranslations.keys[i].pluralizable ) plurals.push(getPlurals(localeTranslations.keys[i]));
            else items.push(getItem(localeTranslations.keys[i]));
        }

        var xml = jsonxml({
            resources: [
                items,
                plurals
            ]
        }, utils.determineOptions(docTypes, xmlHeaders, 'android'));

        return xml.split('<one>').join('<item quantity="one">')
            .split('<zero>').join('<item quantity="zero">')
            .split('<few>').join('<item quantity="few">')
            .split('<many>').join('<item quantity="many">')
            .split('<two>').join('<item quantity="two">')
            .split('<other>').join('<item quantity="other">')

            .split('<one/>').join('<item quantity="one"/>')
            .split('<zero/>').join('<item quantity="zero"/>')
            .split('<few/>').join('<item quantity="few"/>')
            .split('<many/>').join('<item quantity="many"/>')
            .split('<two/>').join('<item quantity="two"/>')
            .split('<other/>').join('<item quantity="other"/>')

            .split('</zero>').join('</item>')
            .split('</one>').join('</item>')
            .split('</two>').join('</item>')
            .split('</few>').join('</item>')
            .split('</many>').join('</item>')
            .split('</other>').join('</item>');
    }
}


function getPlurals (key) {
    key.key = key.key.replace(/ /g, '_');
    var children = getPluralChildren(key.translation.plurals, key.translation.value);
    return {
        name: 'plurals',
        attrs: {name: key.key},
        children: children
    }
}

function getPluralChildren (plurals, value) {
    var props = ['zero', 'one', 'two', 'few', 'many', 'other'];
    var children = [];
    if ( value.indexOf('%d') != -1 ) {
        for ( var k in plurals ) {
            var tempPlural = plurals[k];
            plurals[k] = value.split('%d').join(tempPlural);
        }
    }

    for ( var k in plurals ) {
        if ( props.indexOf(k.toString()) != -1 && plurals.hasOwnProperty(k.toString()) )
            if ( k.toString() == "one" && !plurals[k] ) children.push({name: k, text: value});
            else children.push({name: k, text: plurals[k]});
    }

    return children;
}

function getItem (key) {
    key.key = key.key.replace(/ /g, '_');
    return {
        name: 'string',
        attrs: {name: key.key},
        text: key.translation.value
    };
}