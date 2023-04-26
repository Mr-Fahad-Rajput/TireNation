const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const database = "<Your Data Base String Here></Your>";

mongoose.connect(database,{
    useNewUrlParser :true,
    useUnifiedTopology :true
}).then( () => {
console.log("Connection To the Database was Successful.");

}).catch( (err) => {

console.log(err.message);
});