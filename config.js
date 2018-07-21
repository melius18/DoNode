// ra.0722
var fs = require('fs');
var clientID = fs.readFileSync('D:/src_code/JavaScript/facebook/clientID.txt', 'utf-8');
var clientSecret = fs.readFileSync('D:/src_code/JavaScript/facebook/clientSecret.txt', 'utf-8');

module.exports = {
    sever_port1: 3000,
    db_url: 'mongodb://localhost:27017/local',
    db_schemas: [
        {
            file: './user_schema', collection: 'user5', schemaName: 'UserSchema',
            modelName: 'UserModel'
        }
    ],
    route_info: [
    ],
    // ra.0722
    sever_port2: 443,
    facebook : {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: '/auth/facebook/callback'        
    }
};