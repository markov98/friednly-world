const app = require('./config/express');
const {PORT, DBURL} = require('./config/constants');

app.listen(PORT, console.log(`Listening on port ${PORT}...`));