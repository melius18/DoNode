var mongoose = require('mongoose');

var database = {};

database.init = function (app, config) {
    console.log('database.init()');
    connect(app, config);
}

function connect(app, config) {
    console.log('database connect()');

    var databaseUrl = config.db_url;

    mongoose.Promise = global.Promise;  // ??
    mongoose.connect(databaseUrl, { useNewUrlParser: true });
    database.db = mongoose.connection;

    database.db.on('error', console.error.bind(console, 'mongoose connection error'));
    database.db.on('open', function () {
        console.log('DB: connected at' + databaseUrl);
        createUserSchema(app, config);
    });
    app.set('database', database);
}

function createUserSchema(app, config) {
    var schemaLen = config.db_schemas.length;
    console.log("schemaLen: " + schemaLen);
    for (var i = 0; i < schemaLen; i++) {
        var curItem = config.db_schemas[i];
        var curSchema = require(curItem.file).createSchema(mongoose);
        var curModel = mongoose.model(curItem.collection, curSchema);
        database[curItem.shemaName] = curSchema;
        database[curItem.modelName] = curModel;
    }
}

module.exports = database;