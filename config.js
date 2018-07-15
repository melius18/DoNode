module.exports = {
    sever_port: 3000,
    db_url: 'mongodb://localhost:27017/local',
    db_schemas: [
        {
            file: './user_schema', collection: 'users', schemaName: 'UserSchema',
            modelName: 'UserModel'
        }
    ],
    route_info: [
        { file: './user', path: '/login', method: 'login', type: 'post' },
        { file: './user', path: '/adduser', method: 'adduser', type: 'post' },
        { file: './user', path: '/listuser', method: 'listuser', type: 'post' },
    ]
};