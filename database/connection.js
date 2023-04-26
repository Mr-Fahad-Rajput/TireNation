const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const database = "mongodb+srv://sp19bse036:UKeVdGP8JHT5zU5R@tiresite.2sdw1jz.mongodb.net/?retryWrites=true&w=majority&ssl=true";

mongoose.connect(database,{
    useNewUrlParser :true,
    useUnifiedTopology :true
}).then( () => {
console.log("Connection To the Database was Successful.");

}).catch( (err) => {

console.log(err.message);
});
