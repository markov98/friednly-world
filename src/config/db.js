const mongoose = require('mongoose');

async function dbConnect(URL) {
    await mongoose.connect(URL);
}

module.exports = dbConnect;