const express = require('express');
const cors = require('cors');
const router = require('./router');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')));

app.use('/', router);

app.get('/', (req, res) => {
    res.send('<h1>Running</h1>');
});

if (!process.env.PORT) {
    process.env.PORT = "80";
}
app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
});
