const uri = process.env.MONGODB_URI || "mongodb+srv://raid:raid@raid-swe-challenge.hquma1f.mongodb.net/raid?retryWrites=true&w=majority&appName=Raid-swe-challenge";

const mongoose = require('mongoose');
mongoose.connect(uri, { })
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));