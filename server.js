const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require('path')
const app = express();

require('./database');

app.use(bodyParser.json());

// enabling CORS for some specific origins only. Enable * just for assignment purpose
let corsOptions = { 
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
} 

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// API
const users = require('./api/users');
const fruits = require('./api/fruits');
const order = require('./api/order');
app.use('/api/users', users);
app.use('/api/fruits', fruits);
app.use('/api/orders', order);

const authRoute = require("./api/AuthRoute");
app.use("/api", authRoute);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});