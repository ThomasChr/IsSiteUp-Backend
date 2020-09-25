const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
    res.send('<h1>Running</h1>');
});

app.listen(process.env.PORT, () => {
    console.log('Running')
});