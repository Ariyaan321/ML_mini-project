const mongoose = require('mongoose')

function connectToMongoDB() {
    mongoose.connect(process.env.MDB_CONN_STR);

    mongoose.connection.on('connected', () => console.log('Database connected!'));
    mongoose.connection.on('disconnected', () => console.log('Database disconnected!'));
    mongoose.connection.on('error', (err) => console.log(`Database error ${err}`));
}

module.exports = connectToMongoDB;