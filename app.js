const express = require('express');
const { sequelize } = require('./src/index');

const app = express();

const port = process.env.PORT || 8000;

var cors = require('cors');
app.use(cors());


sequelize.sync({ alter: false }).then().catch(err => console.log(err));

const routesV1 = require('./src/routes.v1');

global.__basedir = __dirname;

app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Welcome to Cakepals!')
});

routesV1(app, '/api');


app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});