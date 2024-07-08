const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const path = require('path')
const app = express();
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

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
