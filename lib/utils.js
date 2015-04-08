module.exports.newError = function (status, message) {
    var error = new Error(message);
    error.status = status;
    return error;
};

module.exports.newQueryResult = function (err, result) {
    return {err: err, result: result};
};

module.exports.determineOptions = function (docTypes, xmlHeaders, platform) {
    var header = null, doctype = null;
    if ( !xmlHeaders ) header = null;
    else {
        for ( var i = 0; i < xmlHeaders.length; i++ )
            for ( var k in xmlHeaders[i] ) if ( xmlHeaders[i][k].toString().toLowerCase() == platform
                || xmlHeaders[i][k].toString().toLowerCase() == 'all' ) header = xmlHeaders[i].header;
    }
    if ( !docTypes ) doctype = null;
    else {
        for ( var i = 0; i < docTypes.length; i++ )
            for ( var k in docTypes[i] ) if ( docTypes[i][k].toString().toLowerCase() == platform
                || docTypes[i][k].toString().toLowerCase() == 'all' ) doctype = docTypes[i].header;
    }
    var options = {};
    if(header) options.xmlHeader = header;
    if(doctype) options.docType = doctype;

    return options;

};


module.exports.translation = {
    "countryCode": "es",
    "isoCode": "es",
    "localeId": "536ccdcd95f980000019f4ec",
    "keys": [
        {
            "key": "Ernesto",
            "comment": "Blanda",
            "pluralizable": true,
            "translation": {
                "value": "Candida %d",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22ec",
                "__v": 0,
                "plurals": {
                    "one": "omnis",
                    "two": "natus",
                    "many": "quos",
                    "few": "aut",
                    "other": "%d"
                },
                "last_modified": "2014-05-09T12:45:26.482Z"
            }
        },
        {
            "key": "Ashley",
            "comment": "Hirthe",
            "pluralizable": true,
            "translation": {
                "value": "%d Barbara",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22ed",
                "__v": 0,
                "plurals": {
                    "one": "quos",
                    "two": "et",
                    "many": "placeat",
                    "few": "voluptatem"
                },
                "last_modified": "2014-05-09T12:45:26.492Z"
            }
        },
        {
            "key": "Afton",
            "comment": "Pollich",
            "pluralizable": false,
            "translation": {
                "value": "Benton",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22ee",
                "__v": 0,
                "plurals": {

                },
                "last_modified": "2014-05-09T12:45:26.492Z"
            }
        },
        {
            "key": "Guillermo",
            "comment": "Windler",
            "pluralizable": false,
            "translation": {
                "value": "Curtis",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22ef",
                "__v": 0,
                "plurals": {

                },
                "last_modified": "2014-05-09T12:45:26.492Z"
            }
        },
        {
            "key": "Carmella",
            "comment": "Friesen",
            "pluralizable": true,
            "translation": {
                "value": "Alene",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f0",
                "__v": 0,
                "plurals": {
                    "one": "enim",
                    "two": "quisquam",
                    "many": "vero",
                    "few": "aut"
                },
                "last_modified": "2014-05-09T12:45:26.493Z"
            }
        },
        {
            "key": "Meghan",
            "comment": "Wiegand",
            "pluralizable": true,
            "translation": {
                "value": "Amalia",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f1",
                "__v": 0,
                "plurals": {
                    "one": "odio",
                    "two": "distinctio",
                    "many": "accusantium",
                    "few": "veniam"
                },
                "last_modified": "2014-05-09T12:45:26.493Z"
            }
        },
        {
            "key": "Jaqueline",
            "comment": "Kutch",
            "pluralizable": true,
            "translation": {
                "value": "Kraig",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f2",
                "__v": 0,
                "plurals": {
                    "one": "nihil",
                    "two": "esse",
                    "many": "at",
                    "few": "molestiae"
                },
                "last_modified": "2014-05-09T12:45:26.494Z"
            }
        },
        {
            "key": "Lonie",
            "comment": "Conn",
            "pluralizable": true,
            "translation": {
                "value": "Waldo",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f3",
                "__v": 0,
                "plurals": {
                    "one": "eius",
                    "two": "maiores",
                    "many": "voluptatem",
                    "few": "non"
                },
                "last_modified": "2014-05-09T12:45:26.494Z"
            }
        },
        {
            "key": "Kay",
            "comment": "Stehr",
            "pluralizable": true,
            "translation": {
                "value": "Citlalli",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f4",
                "__v": 0,
                "plurals": {
                    "one": "quia",
                    "two": "error",
                    "many": "cumque",
                    "few": "culpa"
                },
                "last_modified": "2014-05-09T12:45:26.494Z"
            }
        },
        {
            "key": "Lavina",
            "comment": "Huel",
            "pluralizable": true,
            "translation": {
                "value": "Amina",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f5",
                "__v": 0,
                "plurals": {
                    "one": "est",
                    "two": "et",
                    "many": "qui",
                    "few": "nostrum"
                },
                "last_modified": "2014-05-09T12:45:26.495Z"
            }
        },
        {
            "key": "Trenton",
            "comment": "Will",
            "pluralizable": true,
            "translation": {
                "value": "Florine",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f6",
                "__v": 0,
                "plurals": {
                    "one": "ut",
                    "two": "aliquam",
                    "many": "aliquam",
                    "few": "ducimus"
                },
                "last_modified": "2014-05-09T12:45:26.495Z"
            }
        },
        {
            "key": "Ransom",
            "comment": "Feil",
            "pluralizable": true,
            "translation": {
                "value": "Taryn",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f7",
                "__v": 0,
                "plurals": {
                    "one": "labore",
                    "two": "ipsa",
                    "many": "ducimus",
                    "few": "ea"
                },
                "last_modified": "2014-05-09T12:45:26.496Z"
            }
        },
        {
            "key": "Owen",
            "comment": "Sawayn",
            "pluralizable": true,
            "translation": {
                "value": "Kenna",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f8",
                "__v": 0,
                "plurals": {
                    "one": "amet",
                    "two": "quibusdam",
                    "many": "ad",
                    "few": "eos"
                },
                "last_modified": "2014-05-09T12:45:26.496Z"
            }
        },
        {
            "key": "Genevieve",
            "comment": "Hettinger",
            "pluralizable": true,
            "translation": {
                "value": "Kaden",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22f9",
                "__v": 0,
                "plurals": {
                    "one": "",
                    "two": "",
                    "many": "",
                    "few": ""
                },
                "last_modified": "2014-05-09T12:45:26.510Z"
            }
        },
        {
            "key": "Ashtyn",
            "comment": "Bergnaum",
            "pluralizable": true,
            "translation": {
                "value": "Liliana",
                "locale": "536ccdcd95f980000019f4ec",
                "_id": "536ccde695f98000001a22fa",
                "__v": 0,
                "plurals": {
                    "one": "cum",
                    "two": "accusantium",
                    "many": "dolores",
                    "few": "quisquam"
                },
                "last_modified": "2014-05-09T12:45:26.510Z"
            }
        }
    ]
};