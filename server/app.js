const express = require('express');
const mongoose = require('mongoose')

const app = express();
const cors = require('cors');
const connectToMongoDB = require('./view/conn')
const dataRouter = require('./routes/data')

app.use(cors())
app.use(express.json());

connectToMongoDB();

// Route registration for all data routes
app.use('/', dataRouter);

// root route endpoint
app.get('/', (req, res) => {
    res.send("Root endpoint!");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})

// Default catch all error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

process.on('SIGINT', () => {
    console.log("SIGINT");
    mongoose.disconnect();
    console.log("TERMINATED");
});