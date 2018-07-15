module.exports = {
    sever_port: 3000,
    db_url: 'mongodb://localhost:27017/local',
    db_schemas: [
        {
            file: './user_schema', collection: 'user3', schemaName: 'UserSchema',
            modelName: 'UserModel'
        }
    ],
    route_info: [
    ]
};