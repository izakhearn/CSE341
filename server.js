const express = require('express');
const app = express();

const mongodb = require('./data/database');

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    };
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
}
);
