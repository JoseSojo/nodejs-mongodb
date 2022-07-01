const mongoose = require('mongoose');
const {Schema} = mongoose;

try {
	mongoose.connect("mongodb://localhost:27017/notapp");
	console.log('Db is connected')
} catch(e) {
	console.log(e);
}
