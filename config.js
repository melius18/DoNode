// ra.0722 3. facebook client info
var fs = require('fs');
var clientID = fs.readFileSync('C:/_rfolder/src/facebook/clientID.txt', 'utf-8');
var clientSecret = fs.readFileSync('C:/_rfolder/src/facebook/clientSecret.txt', 'utf-8');

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
    // ra.0722 4. facebook client info 
    sever_port2: 443,
    facebook : {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: '/auth/facebook/callback'        
    }
};