const Data = require('../models/data')

async function createData(req, res) {
    try {
        const { Lat, Lng } = req.body;
        const existingData = await Data.findOne({ Lat, Lng });
        if (existingData) {
            return res.status(409).json("Data already exists");
        }

        await Data.create(req.body);
        res.status(201).send("Data created successfully");

    } catch (error) {
        res.status(500).json("Some error occurred while creating user");
    }
}

module.exports = {
    createData
}