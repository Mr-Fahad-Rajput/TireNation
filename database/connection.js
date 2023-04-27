const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const database = "mongodb+srv://inhousexperts:NG3fPIiz98is8Vfx@tirenation.vne8nxr.mongodb.net/?retryWrites=true&w=majority&ssl=true";

mongoose.connect(database,{
    useNewUrlParser :true,
    useUnifiedTopology :true
}).then( () => {
console.log("Connection To the Database was Successful.");

}).catch( (err) => {

console.log(err.message);
});
