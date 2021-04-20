require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/index.route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('/healthcheck', (req, res) => res.send('Server is running!'));

app.use(routes);

app.use((err, req, res, next) => {

    return res.status(err.status || 500).json({
        status: err.status || 500,
        message:
            err.message ||
            'Something wrong with the server please contact the owner',
    });
});

app.listen(3000, () => {
    console.log(`app listening at PORT: ${3000}`);
});
