const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongodb = require('./data/database');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
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
